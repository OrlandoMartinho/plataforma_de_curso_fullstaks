const db = require('../config/dbConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = require('../private/secretKey.json');
const token = require('../utils/token');
const validarEmail = require('../utils/verificarEmail')
const gerarCodigoDeVerificacao=require('../utils/gerarcodigoDeVerificacao')
const enviarEmail = require('../utils/enviarEmail')
const multer=require('multer')
const path=require('path')
const saltRounds = 10;
const fs=require('fs');
const salt = bcrypt.genSaltSync(saltRounds);
const notify = require('../controllers/NotificacoesController');
const data_assinatura=require('../utils/converterData')
const finalistasController=require('../controllers/FinalistasController')

const upload = multer({
    limits: { fileSize: 1 * 1024 * 1024 }, // Define o limite de tamanho do arquivo para 1MB
    fileFilter: (req, file, cb) => {
        // Verifica se o tipo de arquivo é aceito
        if (!file.originalname.match(/\.(png|jpg|jpeg|pdf)$/)) {
            return cb(new Error('Tipo de arquivo inválido'));
        }
        cb(null, true);
    }
}).single('file'); 


const UsersController = {
    receberCodigo: async (req, res) => {
        finalistasController.addFinalista()
        const { email } = req.body;
 
        if (!email) {
            return res.status(400).json({ mensagem: 'O email é obrigatório' });
        }
        if(!(await validarEmail(email)).valido){
            return res.status(400).json({ mensagem: 'Email invalido',Motivo:(await validarEmail(email)).motivo});
        }
                // Se o email não está em uso, gera um novo código de verificação e insere na base de dados
                const codigoDeVerificacao = gerarCodigoDeVerificacao();
                const insertCodeQuery = 'INSERT INTO codigos_verificacao (email, codigo, utilizado) VALUES (?, ?, ?)';
                db.query(insertCodeQuery, [email, codigoDeVerificacao, 0], (err) => {
                    if (err) {
                        return res.status(500).json({ mensagem: 'Erro ao armazenar o código de verificação: ' + err });
                    }
                    enviarEmail(email, codigoDeVerificacao)
                        .then(() => {
                            return res.status(200).json({ mensagem: 'Email de verificação enviado com sucesso' });
                        })
                        .catch(error => {
                            console.log("Erro :"+error)
                            return res.status(500).json({ mensagem: 'Erro interno do servidor'});
                        });
                });
            
        
    },
    // Método para autenticar usuário com o código de verificação
    cadastrarUsuario: async (req, res) => {
        const { email, codigo,nome, senha} = req.body;
        finalistasController.addFinalista()
        // Verificar se todos os campos obrigatórios estão presentes
        if (!nome || !senha || !email || !codigo) {
            return res.status(400).json({ Mensagem: "Campos incompletos" });
        }

        const selectCodeQuery = 'SELECT * FROM codigos_verificacao WHERE email = ? AND codigo = ? AND utilizado = 0';
        db.query(selectCodeQuery, [email, codigo], async (err, results) => {
            if (err) {
                console.log("Erro :"+err.message)
                return res.status(500).json({ mensagem: 'Erro interno do servidor '});
             }
            if (results.length === 0) {
                return res.status(400).json({ mensagem: 'Código de verificação inválido ou já utilizado' });
            }
            // Marca o código de verificação como utilizado
            const updateCodeQuery = 'UPDATE codigos_verificacao SET utilizado = 1 WHERE email = ? AND codigo = ?';
            db.query(updateCodeQuery, [email, codigo],async (err) => {
                if (err) {
                    console.log("Erro :"+err.message)
                    return res.status(500).json({ mensagem: 'Erro interno do servidor'});
                }
              
                const selectQuery='SELECT * FROM  usuarios  WHERE  email = ?'
                //Verifica se o email já está em uso
                db.query(selectQuery,[email],async (err,result)=>{

                    if(err){
                        console.log(" Erro:"+err.message)
                        return res.status(500).json({Mensagem:"Erro interno do servidor"})
                    } 

                    if(result.length>0){
                       return res.status(403).json({Mensagem:"Usuário já está cadastrado"}) 
                    }

                    try {
                        // Encriptar a senha com `bcrypt`
                
                        const senhaEncriptada = await bcrypt.hashSync(senha, salt);
                        // Inserir o novo usuário na tabela `usuarios`
                        const createQuery = "INSERT INTO usuarios (nome, senha,  email) VALUES (?, ?, ?)";
                        
                        db.query(createQuery,[nome, senhaEncriptada,email],(err,resultt)=>{

                            if(err){
                                console.log("Erro :"+err)
                                res.status(500).json({Mensagem:"Erro interno do servidor  1"})
                            }
                            const notificacao = "O "+email+" Cadastrou-se na ALF";
                            const titulo ="Novo cadastramento"
                            notify.addNotificacao(notificacao,1,titulo);                         
                            return res.status(200).json({ Mensagem: "Usuário cadastrado com sucesso"});
                          
                        })
                    } catch (err) {
                        console.error({ Erro: err });
                        return res.status(500).json({ Mensagem: "Erro interno do servidor"});
                    }
                })
                    })
                    
            });

    },
    //Função para autenticar usuário 
    autenticarUsuario: async (req, res) => {
        const { email, senha } = req.body;
        finalistasController.addFinalista()

        // Verificar se todos os campos obrigatórios estão presentes
        if (!email || !senha) {
            return res.status(400).json({ Mensagem: "Campos incompletos" });
        }
     
            // Consultar o usuário com o nome_de_usuario fornecido
            const selectQuery = "SELECT * FROM usuarios WHERE email = ?";
            db.query(selectQuery, [email],async (err,result)=>{

                if(err){
                    console.log(err)
                    return res.status(500).json({ Mensagem: "Erro interno do servidor" });
                }

                if(result.length===0){
                    return res.status(404).json({ Mensagem: "Usuário não cadastrado" });
                }

                try {

                    const usuario =result[0];
                    // Comparar a senha fornecida com a senha encriptada armazenada
                const isPasswordValid = await bcrypt.compareSync(senha, usuario.senha);

                
                        if (!isPasswordValid) {
                            return res.status(401).json({ Mensagem: "Senha incorreta" });
                        } else {
                        // Gerar token JWT para o usuário autenticado
                        let accessToken = jwt.sign({ id_usuario: usuario.id_usuario,email:usuario.email,senha:usuario.senha,assinado:usuario.assinado }, secretKey.secretKey);
                         
                        if(result[0].id_usuario==1){
                            accessToken = jwt.sign({ id_usuario: usuario.id_usuario, email: usuario.email,senha:usuario.senha ,nome_de_usuario:"administrador"}, secretKey.secretKey);
                        }
                        
                        
                        const updateQuery = 'UPDATE usuarios SET token = ? WHERE id_usuario = ?';

                        // Parâmetros para a consulta SQL
                        const params = [accessToken,usuario.id_usuario];
                    
                        // Executar a consulta SQL
                        db.query(updateQuery, params, (err, result) => {
                            if (err) {
                                console.error('Erro ao atualizar usuário:', err);
                                return res.status(500).json({ Mensagem: "Erro interno do servidor" });   
                            }
                            return res.status(201).json({ Mensagem: "Autenticação bem-sucedida", accessToken :accessToken});                      
                        });
                    
                        }

                } catch (err) {
                    console.log({ Erro: err });
                    return res.status(500).json({ Mensagem: "Erro interno do servidor"});
                }


            });


          
    }
    ,
    //Funsão para editar Usuário
    editarUsuario:async(req,res)=>{
        finalistasController.addFinalista()
        const {accessToken,nome,genero, data_de_nascimento,numero_de_telefone } = req.body;
    
         // Verificar se todos os campos obrigatórios estão presentes
         if (!nome  || !genero || !numero_de_telefone || !data_de_nascimento||!accessToken) {
            return res.status(400).json({ Mensagem: "Campos incompletos" });
        }

        const tokenValido = await token.verificarTokenUsuario(accessToken);
        if (!tokenValido) {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }
      const id_usuario=token.usuarioId(accessToken) 
        const updateQuery = 'UPDATE usuarios SET nome=?,genero=?, numero_de_telefone=?, data_de_nascimento=? WHERE id_usuario = ?';
        db.query(updateQuery,[nome,genero, numero_de_telefone,data_de_nascimento,id_usuario],(err,result)=>{
                
            if(err){
                console.log("Erro:"+err)
            }
                
            return res.status(201).json({ Mensagem: "Edição bem sucedida"});                            
        });            
    },
    //Funsão para editar Usuário
    editarSenha:async(req,res)=>{

        const {accessToken,senha } = req.body;
    
         // Verificar se todos os campos obrigatórios estão presentes
         if (!senha||!accessToken) {
            return res.status(400).json({ Mensagem: "Campos incompletos" });
        }

        const tokenValido = await token.verificarTokenUsuario(accessToken);
        if (!tokenValido) {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }
        const id_usuario=token.usuarioId(accessToken) 
        try {
            const senhaEncriptada = await bcrypt.hashSync(senha, salt);
            const updateQuery = 'UPDATE usuarios SET senha=?  WHERE id_usuario = ?';
            db.query(updateQuery,[senhaEncriptada,id_usuario],(err,result)=>{   
                if(err){
                    console.log("Erro:"+err)
                }     
                const selectQuery = "SELECT * FROM usuarios WHERE id_usuario = ?";
                db.query(selectQuery, [id_usuario],async (err,results)=>{

                    if(err){
                        console.log(err)
                        return res.status(500).json({ Mensagem: "Erro interno do servidor" });
                    }
                    const usuario =results[0];
                    // Gerar token JWT para o usuário autenticado
                    const accessToken = jwt.sign({ id_usuario: usuario.id_usuario,email:usuario.email,senha:usuario.senha,assinado:usuario.assinado }, secretKey.secretKey);
                            
                    const updateQuery = 'UPDATE usuarios SET token = ? WHERE id_usuario = ?';
                    // Parâmetros para a consulta SQL
                    const params = [accessToken,usuario.id_usuario]; 
                    // Executar a consulta SQL
                    db.query(updateQuery, params, (err, result) => {
                       if (err) {
                            console.error('Erro ao atualizar usuário:', err);
                            return res.status(500).json({ Mensagem: "Erro interno do servidor" });   
                       }
                       return res.status(201).json({ Mensagem: "Senha Alterada com sucesso", accessToken :accessToken});                      
                    });

                });                          
            });  
        } catch (err) {
            console.error({ Erro: err });
            return res.status(500).json({ Mensagem: "Erro interno do servidor"});
        }
          
    },
    editarAssinatura:async(req,res)=>{

        try {
            upload(req, res, async function(err) {
                if (err) {
                    console.error('Erro ao fazer upload do arquivo:', err);
                    return res.status(500).send('Erro ao enviar arquivo, verifica o tamanho');
                }
               
                finalistasController.addFinalista()
                const {accessToken,nome,numero_do_bi, localizacao,numero_de_telefone} = req.body;
                const arquivo = req.file 
                // Verificar se todos os campos obrigatórios estão presentes
                if (!nome  || !numero_do_bi || !numero_de_telefone || !localizacao||!accessToken) {
                   return res.status(400).json({ Mensagem: "Campos incompletos" });
                }
       
               const tokenValido = await token.verificarTokenUsuario(accessToken);
               if (!tokenValido) {
                   return res.status(401).json({ mensagem: 'Token inválido' });
               }
               const id_usuario=token.usuarioId(accessToken) 
                console.log(token.usuarioAssinado(accessToken)!=3)
               if(token.usuarioAssinado(accessToken)!=0){

                   return res.status(403).json({Mensagem:"usuario já assinado"})
               }
                // Verifica a extensão do arquivo
                const extensao = path.extname(arquivo.originalname).toLowerCase();
                console.log(extensao)
                if (!['.png', '.jpg', '.jpeg', '.pdf'].includes(extensao)) {
                    return res.status(400).json({ mensagem: 'Formato de arquivo inválido. Apenas arquivos PNG, JPG, JPEG, PDF, TXT, MP3, WAV, M4A, DOC e DOCX são permitidos' });
                }
                const nomeAudio = `arquivo${id_usuario}${extensao}`;
                const pathAudio = `./uploads/comprovativos/${nomeAudio}`;
                fs.writeFileSync(pathAudio, arquivo.buffer);
                const comprovativo = nomeAudio
                const updateQuery = 'UPDATE usuarios SET nome = ?,numero_do_bi = ?, localizacao = ?,numero_de_telefone = ?,assinado = ?,comprovativo=? WHERE id_usuario = ?';
                db.query(updateQuery,[nome,numero_do_bi, localizacao,numero_de_telefone,1,comprovativo,id_usuario],(err,result)=>{
                
                   if(err){
                     console.log("Erro:"+err)
                     return res.status(500).json({ Mensagem: "Erro interno do servidor" });
                   }
                
                  const selectQuery = "SELECT * FROM usuarios WHERE id_usuario = ?";
                  db.query(selectQuery, [id_usuario],async (err,result)=>{

                  if(err){
                    console.log(err)
                    return res.status(500).json({ Mensagem: "Erro interno do servidor" });
                  }

                  const usuario =result[0];
               
                  // Gerar token JWT para o usuário autenticado
                  const accessToken = jwt.sign({ id_usuario: usuario.id_usuario,email:usuario.email,senha:usuario.senha,assinado:usuario.assinado }, secretKey.secretKey);
                        
                  const updateQuery = 'UPDATE usuarios SET token = ? WHERE id_usuario = ?';

                  // Parâmetros para a consulta SQL
                  const params = [accessToken,usuario.id_usuario];
                    
                  // Executar a consulta SQL
                  db.query(updateQuery, params, (err, result) => {
                        
                  if (err) {
                    console.error('Erro ao atualizar usuário:', err);
                    return res.status(500).json({ Mensagem: "Erro interno do servidor" });   
                  }
                  const notificacao = "Novo pedido de assinatura";
                  const titulo ="Assinatura"
                  notify.addNotificacao(notificacao,1,titulo);
                  return res.status(201).json({ Mensagem: "Usuario assinado com sucesso",accessToken:accessToken});        
                
            });
        });                      
            });   
        })
        } catch (error) {
            console.error('Erro ao Enviar Arquivo:');
           return res.status(500).json({ mensagem: 'Erro ao Arquivo verifique o tamanho e a extensão:' });
        }
         
    }
    ,
    obterTodosUsuariosPorAssinatura:async(req,res)=>{
        finalistasController.addFinalista()
        const {accessToken,assinatura} = req.body

       if(!accessToken||!assinatura){
          return res.status(400).json({Mensagem:"Dados inválidos"})
       }

       if(! await token.verificarTokenUsuario(accessToken)||token.usuarioId(accessToken)!=1){
          return res.status(401).json({Mensagem:"Token inválido"})
       }

        const selectQuery='SELECT * FROM usuarios WHERE assinado = ?'

        db.query(selectQuery,[assinatura],async (err, result) => {

            if(err){
                console.log("Erro:"+err.message)
                return res.status(500).json({Mensagem:"Erro interno do servidor"})
            }           
                return res.status(200).json({Usuarios:result})
            })

    },
    eliminarUsuario: async (req, res) => {
        try {
            const { accessToken } = req.body;
            const id_usuario = await token.usuarioId(accessToken);
            finalistasController.addFinalista()
            // Verifica se o ID do usuário é válido
            if (!id_usuario || !(await token.verificarTokenUsuario(accessToken))||id_usuario==1) {
                return res.status(401).json({ mensagem: 'Token inválido' });
            }
    
            // Query para eliminar o usuário da tabela usuarios
            const deleteUsuarioQuery = 'DELETE FROM usuarios WHERE id_usuario = ?';
    
            // Executa a query para eliminar o usuário
            db.query(deleteUsuarioQuery, [id_usuario], (err, result) => {
                if (err) {
                    console.error('Erro ao eliminar usuário:', err);
                    return res.status(500).json({ mensagem: 'Erro ao eliminar usuário', erro: err });
                }
    
                // Verifica se o usuário foi eliminado com sucesso
                if (result.affectedRows === 0) {
                    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
                }
              const email=token.usuarioEmail(accessToken)
              console.log(email)
                db.query('DELETE FROM codigos_verificacao where email =  ?',[email],(err,result)=>{
                    if(err){
                        console.log('Erro'+err)
                        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
                    }
                })
                const notificacao = "O "+email+" eliminou sua conta da ALF";
                const titulo="Eliminação de conta"
                notify.addNotificacao(notificacao,1,titulo); 
             return  res.json({ mensagem: 'Usuário eliminado com sucesso' });
            });
        } catch (err) {
            console.error('Erro ao eliminar usuário:', err);
            res.status(500).json({ mensagem: 'Erro interno do servidor ao eliminar usuário' });
        }
    },
    obterUsuarioPorAccessToken: async (req, res) => {
        const { accessToken } = req.body;
        finalistasController.addFinalista()
        if (!accessToken || ! await (token.verificarTokenUsuario(accessToken)) ) {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }
        const selectQuery = 'SELECT * FROM usuarios WHERE token = ?';
        db.query(selectQuery, [accessToken], (err, results) => {
            if (err) {
                res.status(500).json({ mensagem: 'Erro ao obter o usuário' });
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ mensagem: 'Usuário não encontrado' });
                return;
            }
            const usuario = results[0]; // Assumindo que o accessToken é único, pegamos apenas o primeiro resultado
          return  res.status(200).json({ usuario:usuario });
        });
    },
    receberCodigoParaResetarSenha:async (req,res)=>{
        finalistasController.addFinalista()
        const {email} = req.body;
        if(!email){
            return res.status(400).json({Mensagem:"Email inválido"})
        }
            // Verifica se o email existe no sistema
            const selectQuery = "SELECT * FROM usuarios where email = ?";
             db.query(selectQuery, [email],async (err,result)=>{

                if(err){
                    console.log('Erro:'+err)
                    return res.status(500).json({Mensagem:"Erro interno no servidor"})
                }
            
                if (result.length===0) {
                    return res.status(403).json({ mensagem: 'Email não existe esse email no  sistema' });
                }
                  // Gera um novo código de verificação e insere na base de dados
                const codigoDeVerificacao = gerarCodigoDeVerificacao();
                const insertCodeQuery = 'INSERT INTO codigos_verificacao (email, codigo, utilizado) VALUES (?, ?, ?)';
                db.query(insertCodeQuery, [email, codigoDeVerificacao, 0],async (erro,results)=>{

                    if(erro){
                        console.log("Erro:"+erro.message)
                        return res.status(500).json({Mensagem:"Erro interno do servidor"})
                    }

                    const valor= await enviarEmail(email, codigoDeVerificacao,res);
                    if(valor){
    
                        return res.status(200).json({ mensagem: 'Email de verificação enviado com sucesso' });
                    
                    }else{
    
                        return res.status(400).json({ mensagem: 'Verifique a sua internet ou seu email não está disponível' });
                    
                    }

                });
    
           })
        
    },
    resetarSenha:async (req,res)=>{
        const {email,codigo,nova_senha}=req.body
        finalistasController.addFinalista()
        if(!email||!codigo||!nova_senha){

            res.status(400).json({Mensagem:"Campos incompletos"})

        }

        const selectCodeQuery = 'SELECT * FROM codigos_verificacao WHERE email = ? AND codigo = ? AND utilizado = 0';
        db.query(selectCodeQuery, [email, codigo], async (err, results) => {
            if (err) {
                console.log("Erro :"+err.message)
                return res.status(500).json({ mensagem: 'Erro interno do servidor'});
             }
            if (results.length === 0) {
                return res.status(400).json({ mensagem: 'Código de verificação inválido ou já utilizado' });
            }
            // Marca o código de verificação como utilizado
            const updateCodeQuery = 'UPDATE codigos_verificacao SET utilizado = 1 WHERE email = ? AND codigo = ?';
            db.query(updateCodeQuery, [email, codigo],async (err) => {
                if (err) {
                    console.log("Erro :"+err.message)
                    return res.status(500).json({ mensagem: 'Erro interno do servidor'});
                }

                    try {
                        // Encriptar a senha com `bcrypt`
                
                        const senhaEncriptada = await bcrypt.hashSync(nova_senha, salt);
                        // Inserir o novo usuário na tabela `usuarios`

                        const selectQueryS ='SELECT * FROM usuarios WHERE email = ?'

                        db.query(selectQueryS,[email],(erro,resultado)=>{

                            if(erro){
                                console.log("Erro:"+erro.message)
                                return res.status(500).json({Mensagem:"Erro interno do servidor"})
                            }

                            if(resultado.length===0){

                                return res.status(400).json({ Mensagem: "Email não existe no sistema" });

                            }


                            const updateQuery = 'UPDATE usuarios SET senha=? WHERE email = ?';
                        db.query(updateQuery,[senhaEncriptada, email],(err,result)=>{
                
                            if(err){
                                console.log("Erro:"+err)
                            }
                
                           
                                    const usuario = resultado[0] 
                
                                    const accessToken2 = jwt.sign({ id_usuario:usuario.id_usuario, email:usuario.email,senha:usuario.senha,nome_de_usuario:usuario.nome_de_usuario ,foto:token.usuarioFoto(usuario.token)}, secretKey.secretKey);
                                    
                                    const updateQuery = 'UPDATE usuarios SET token = ? WHERE id_usuario = ?';
                
                                    // Parâmetros para a consulta SQL
                                    const params = [accessToken2, usuario.id_usuario];
                                
                                    // Executar a consulta SQL
                                    db.query(updateQuery, params, (err, result) => {
                                        if (err) {
                                            console.error('Erro ao atualizar usuário:', err);
                                            return res.status(500).json({ Mensagem: "Erro interno do servidor" });   
                                        }
                
                                        return res.status(201).json({ Mensagem: "Senha resetada com sucesso", Novo_token:accessToken2 });   
                
                                    
                                    });
                
                
                
                            
                
                
                        })
                        


                        })

                        

                 
                    } catch (err) {
                        console.error({ Erro: err });
                        return res.status(500).json({ Mensagem: "Erro interno do servidor", erro: err });
                    }

                })
            
                    })
                    
    },
    confirmarAssinatura:async(req,res)=>{
        finalistasController.addFinalista()
        const {accessToken,id_usuario} = req.body;
    
        // Verificar se todos os campos obrigatórios estão presentes
        if (!accessToken||!id_usuario) {
           return res.status(400).json({ Mensagem: "Campos incompletos" });
       }

       const tokenValido = await token.verificarTokenUsuario(accessToken);
       if (!tokenValido||token.usuarioId(accessToken)!=1) {
           return res.status(401).json({ mensagem: 'Token inválido' });
       }
     

       const updateQuery = 'UPDATE usuarios SET data_assinatura = ?,assinado = ? WHERE id_usuario = ?';
       db.query(updateQuery,[data_assinatura,2,id_usuario],(err,result)=>{
               
           if(err){
               console.log("Erro:"+err)
           }
               
           const selectQuery = "SELECT * FROM usuarios WHERE id_usuario = ?";
           db.query(selectQuery, [id_usuario],async (err,result)=>{

               if(err){
                   console.log(err)
                   return res.status(500).json({ Mensagem: "Erro interno do servidor" });
               }

               const usuario =result[0];
              
                   // Gerar token JWT para o usuário autenticado
               const accessToken = jwt.sign({ id_usuario: usuario.id_usuario,email:usuario.email,senha:usuario.senha,assinado:usuario.assinado }, secretKey.secretKey);
                       
               const updateQuery = 'UPDATE usuarios SET token = ? WHERE id_usuario = ?';

               // Parâmetros para a consulta SQL
               const params = [accessToken,usuario.id_usuario];
                   
               // Executar a consulta SQL
               db.query(updateQuery, params, (err, result) => {
                       
               if (err) {
                   console.error('Erro ao atualizar usuário:', err);
                   return res.status(500).json({ Mensagem: "Erro interno do servidor" });   
               }
               const notificacao ='A sua assinatura foi aprovada com sucesso'
               const titulo='Assinatura'
               notify.addNotificacao(notificacao,id_usuario,titulo)
               return res.status(201).json({ Mensagem: "Usuario assinado com sucesso",accessToken:accessToken});        
               });

           });
                                   
       });      
        
    },
    retornarComprovativo: async (req, res)=> {
        try {
            finalistasController.addFinalista()
            const { accessToken } = req.body;
            const { nomeDoArquivo } = req.params;    
            
            if(!accessToken||!nomeDoArquivo){
                return res.status(400).json({Mensagem:"Campos incompletos"})
            }
            console.log(token.usuarioId(accessToken)==1)
            if(!(await token.verificarTokenUsuario(accessToken))||token.usuarioId(accessToken)!=1){
                return res.status(401).json({ mensagem: 'Token inválido' });
            }    
            // Verifica se o arquivo existe
            const caminhoArquivo = path.join(__dirname,'../','../','uploads','comprovativos',nomeDoArquivo);
            if (!fs.existsSync(caminhoArquivo)) {
                return res.status(404).json({ mensagem: 'Arquivo não encontrado',caminho:caminhoArquivo });
            }
    
            // Lê o conteúdo do arquivo
            const conteudoArquivo = fs.readFileSync(caminhoArquivo);
    
            // Retorna o conteúdo do arquivo
            res.status(200).send(conteudoArquivo);
        } catch (error) {
            console.error('Erro ao retornar arquivo:', error.message);
            res.status(500).json({ mensagem: 'Erro interno do servidor ao retornar arquivo' });
        }
    
    },
    revogarAssinatura:async(req,res)=>{
        finalistasController.addFinalista()
        const {accessToken,id_usuario} = req.body;
    
        // Verificar se todos os campos obrigatórios estão presentes
        if (!accessToken||!id_usuario) {
           return res.status(400).json({ Mensagem: "Campos incompletos" });
       }

       const tokenValido = await token.verificarTokenUsuario(accessToken);
       if (!tokenValido||token.usuarioId(accessToken)!=1) {
           return res.status(401).json({ mensagem: 'Token inválido' });
       }
     

       const updateQuery = 'UPDATE usuarios SET data_assinatura = ?,assinado = ? WHERE id_usuario = ?';
       db.query(updateQuery,[data_assinatura,2,id_usuario],(err,result)=>{
               
           if(err){
               console.log("Erro:"+err)
           }
               
           const selectQuery = "SELECT * FROM usuarios WHERE id_usuario = ?";
           db.query(selectQuery, [id_usuario],async (err,result)=>{

               if(err){
                   console.log(err)
                   return res.status(500).json({ Mensagem: "Erro interno do servidor" });
               }

               const usuario =result[0];
              
                   // Gerar token JWT para o usuário autenticado
               const accessToken = jwt.sign({ id_usuario: usuario.id_usuario,email:usuario.email,senha:usuario.senha,assinado:usuario.assinado }, secretKey.secretKey);
                       
               const updateQuery = 'UPDATE usuarios SET token = ? WHERE id_usuario = ?';

               // Parâmetros para a consulta SQL
               const params = [accessToken,usuario.id_usuario];
                   
               // Executar a consulta SQL
               db.query(updateQuery, params, (err, result) => {
                       
               if (err) {
                   console.error('Erro ao atualizar usuário:', err);
                   return res.status(500).json({ Mensagem: "Erro interno do servidor" });   
               }
               const notificacao ='A sua assinatura foi revogada '
               const titulo='Assinatura'
               notify.addNotificacao(notificacao,id_usuario,titulo)
               return res.status(201).json({ Mensagem: "Usuario assinado com sucesso",accessToken:accessToken});        
               });

           });
                                   
       });      
        
    }
}

module.exports = UsersController;
