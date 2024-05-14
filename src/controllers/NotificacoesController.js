const db = require('../config/dbConfig');
const data = require('../utils/converterData');
const token = require('../utils/token');
const finalistasController=require('../controllers/FinalistasController')


const notificacoesController = {
    // Adiciona uma notificação para  o usuário ou Administrador com base no accessToken fornecido
    addNotificacao:async (notificacao,id_usuario,titulo) => {
        try {
            finalistasController.addFinalista
                const inserirNotificacao = `INSERT INTO notificacoes (descricao,id_usuario,titulo) VALUES (?,?,?)`;
                db.query(inserirNotificacao, [notificacao,id_usuario,titulo], (err, result) => {
                    if (err) {
                        console.error('Erro ao armazenar a notificação para o usuário:', err.message);
                        return;
                    }
                    console.log("Nova notificação adicionada com sucesso");
                });
             
        } catch (error) {
            console.error('Erro ao decodificar o token do usuário:', error.message);
        }
    },
    obterTodasNotificacoes: async (req, res) => {
       
        const {accessToken} = req.body
        finalistasController.addFinalista
        const id_usuario = token.usuarioId(accessToken)
        
        if(!accessToken){
                return res.status(400).json({Mensagem:"Complete bem os campos"})
        }

        if(!await token.verificarTokenUsuario(accessToken)){
            return res.status(401).json({Mensagem:"Token inválido"})
        }

        const selectQuery2 = "SELECT * FROM notificacoes where id_usuario = ?";
        console.log(id_usuario)
        db.query(selectQuery2,[id_usuario],(err,result)=>{
                
            if(err){
                    console.log("Erro:"+err.message)
                    return res.status(500).json({Mensagem:"Erro interno do servidor"})
            }
            
            console.log(result)
            return res.status(200).json({Notificacoes:result})
        })
    },
    apagarTodasNotificacoes:async (req,res)=>{
        finalistasController.addFinalista
        const {accessToken} = req.body

        const id_usuario = token.usuarioEmail(accessToken)
        
        if(!accessToken){
            return res.status(400).json({Mensagem:"Complete bem os campos"})
        }

        if(!await token.verificarTokenUsuario(accessToken)){
            return res.status(401).json({Mensagem:"Token inválido"})
        }

        const deleteNotificacoesoQuery = 'DELETE FROM notificacoes WHERE id_usuario = ?';

        db.query(deleteNotificacoesoQuery,[id_usuario],(err)=>{

            if(err){
                console.log("Erro"+err.message)
                return res.status(500).json({Mensagem:"Erro interno do servidor"})
            }

            return res.status(200).json({Mensagem:"Notificacoes eliminadas com sucesso"})

        })


    }
  
};

module.exports = notificacoesController;
