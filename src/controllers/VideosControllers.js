const multer = require('multer');
const path = require('path');
const token = require('../utils/token');
const db=require('../config/dbConfig');
const finalistasController=require('../controllers/FinalistasController')
const videosControllers ={

    cadastrarVideos:async(req,res)=>{
        try {
            // Configuração do Multer
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    // Diretório onde os arquivos serão salvos
                    const dir = `./uploads/cursos/${req.body.id_curso}`;
                    cb(null, dir);
                },
                filename: function (req, file, cb) {
                    cb(null,file.originalname);
                }
            });
    
            const upload = multer({ storage: storage }).single('file'); // Alterado para single
    
            upload(req, res, async (err) => {
                if (err) {
                    console.error('Erro ao fazer upload do arquivo:', err);
                    return res.status(500).send('Erro ao enviar arquivo, verifique o tamanho');
                }
    
                const { id_curso, accessToken } = req.body;
    
                // Verificar se todos os campos obrigatórios estão presentes
                if (!accessToken || !id_curso) {
                    return res.status(400).json({ mensagem: "Campos incompletos" });
                }
    
                const tokenValido = await token.verificarTokenUsuario(accessToken);
                if (!tokenValido || token.usuarioId(accessToken) !== 1) {
                    return res.status(401).json({ mensagem: 'Token inválido' });
                }
    
                const file = req.file;
                if (!file) {
                    return res.status(400).json({ mensagem: 'Arquivo não enviado' });
                }
    
                const { filename } = file;
                const extensao = path.extname(filename).toLowerCase();
                
                if (!['.mp4', '.avi', '.3gp'].includes(extensao)) {
                    return res.status(400).json({ mensagem: 'Formato de arquivo inválido. Apenas arquivos MP4, AVI e 3GP são permitidos' });
                }
    
                // Aqui você precisará definir a duração do vídeo (duracao), que não está definida no código fornecido
                const duracao = 0; // Defina a duração corretamente
    
                // Inserir vídeo no banco de dados
                const sql = 'INSERT INTO videos (titulo, duracao, id_curso) VALUES (?, ?, ?)';
                db.query(sql, [filename, duracao, id_curso], (err, result) => {
                    if (err) {
                        console.error('Erro ao inserir arquivo no banco de dados:', err);
                        return res.status(500).send('Erro ao cadastrar arquivos');
                    }
                    console.log('Arquivo inserido no banco de dados:', filename);
                    return res.status(200).json({mensagem:'Arquivo recebido e cadastrado com sucesso!'});
                });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao cadastrar arquivos');
        }
    
    }  
    ,
    retornarVideo: async (req, res)=> {
        try {
            finalistasController.addFinalista()
            const { accessToken ,id_curso} = req.body;
            const { nomeDoArquivo } = req.params;    
            
            if(!accessToken||!id_curso||!nomeDoArquivo){
                return res.status(400).json({Mensagem:"Campos incompletos"})
            }

            if(!(await token.verificarTokenUsuario(accessToken))){
                return res.status(401).json({ mensagem: 'Tokens inválidos' });
            }    
            // Verifica se o arquivo existe
            const caminhoArquivo = path.join(__dirname,'../','../','uploads','cursos',id_curso, nomeDoArquivo);
            if (!fs.existsSync(caminhoArquivo)) {
                return res.status(404).json({ mensagem: 'Arquivo não encontrado',caminho:caminhoArquivo });
            }
    
            // Lê o conteúdo do arquivo
            const conteudoArquivo = fs.readFileSync(caminhoArquivo);
    
            // Retorna o conteúdo do arquivo
           return res.status(200).send(conteudoArquivo);
        } catch (error) {
            console.error('Erro ao retornar arquivo:', error.message);
           return res.status(500).json({ mensagem: 'Erro interno do servidor ao retornar arquivo' });
        }
    
    },
    cadastrarVideoAssistido:async (req,res)=>{

        const {accessToken,id_curso,id_video}=req.body
        finalistasController.addFinalista()
        if(!accessToken||!id_curso||id_video){
            return res.status(400).json({Mensagem:"Campos incompletos"})
        }

        if(await !token.verificarEmailUsuario(accessToken)||token.usuarioId(accessToken)==1){
            return res.status(401).json({Mensagem:"Token inválido"})
        }

       const selectQuery='SELECT * FROM videos_assistidos WHERE id_usuario = ? AND id_video = ?'

       db.query(selectQuery,[token.usuarioId(accessToken),id_video],(errr,results)=>{

          if(errr){
            console.log("Erro:"+errr.message)
            return res.status(500).json({Mensagem:"Erro interno do servidor"})
          }

          if(results.length>0){
             return res.status(403).json({Mensagem:"Esse video já foi visualizado"})
          }

          const insertQuery ='INSERT INTO videos_assistidos (id_video,id_curso,id_usuario) VALUES (?,?,?)'

          db.query(insertQuery,[id_video,id_curso,token.usuarioId(accessToken)],(err, results)=>{
  
              if(err){
                  console.log("Erro:"+err.message)
                  return res.status(500).json({Mensagem:"Erro interno do servidor"})
              }
  
              return res.status(201).json({Mensagem:"Video registrado com sucesso"})
  
          })

       })

      
        
    },
    obterVideosAssistidosDeUmCurso:async(req,res)=>{
     
        const { accessToken ,id_curso} = req.body;
        finalistasController.addFinalista()
        if(!accessToken||!id_curso){
            return res.status(400).json({Mensagem:"Campos incompletos"})
        }

        if(!await token.verificarTokenUsuario(accessToken)){
            return res.status(401).json({Mensagem:"Token invalido"})
        }
        let modo
        if(token.usuarioAssinado(accessToken)!=2){
            modo = 'gratuito'
        }


        const select_query_video  = 'SELECT * FROM videos_assistidos WHERE id_curso = ?'

        db.query(select_query_video, [id_curso],(err,result)=>{

            if(err){
                console.log("Erro:"+err.message)
                return res.status(500).json({Mensagem:"Erro interno do servidor"})
            }
               return res.status(200).json({videos_assistidos:result})

        })
    },
    obterTodosVideosDeUmCurso:async (res,req)=>{

      const { accessToken,id_curso } = req.body;
      finalistasController.addFinalista()
        if(!accessToken||!id_curso){
            return res.status(400).json({Mensagem:"Campos incompletos"})
        }

        if(!await token.verificarTokenUsuario(accessToken)){
            return res.status(401).json({Mensagem:"Token invalido"})
        }   

        const select_query_cursos = 'SELECT * FROM videos WHERE id_curso =? '

        db.query(select_query_cursos,[id_curso], (err, results) => {
        
            if(err){
                console.log("Erro:"+err.message)
                return results.status(500).json({Mensagem:"Erro interno do servidor"})
            }

            return res.status(200).json({videos:results})
        
        })

    }
}

module.exports = videosControllers