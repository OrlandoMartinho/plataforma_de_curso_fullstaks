const multer = require('multer');
const path = require('path');
const token = require('../utils/token');
const db=require('../config/dbConfig');
const finalistasController=require('../controllers/FinalistasController')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
const cursosControllers ={

    cadastrarCurso:async (req,res)=>{
        finalistasController.addFinalista()
        const {accessToken,nome_do_formador,titulo,categoria,modo,descricao,modulo}=req.body

        if(!accessToken||!nome_do_formador||!titulo||!categoria||!modo||!descricao||!modulo){
            return res.status(400).json({Mensagem:"Campos incompletos"})
        }

        if(await !token.verificarEmailUsuario(accessToken)||token.usuarioId(accessToken)!=1){
            return res.status(401).json({Mensagem:"Token inválido"})
        }

        const insertQuery ='INSERT INTO cursos (nome_do_formador,titulo,categoria,modo,descricao,modulo) VALUES (?,?,?,?,?,?)'

        db.query(insertQuery,[nome_do_formador,titulo,categoria,modo,descricao,modulo],(err, results)=>{

            if(err){
                console.log("Erro:"+err.message)
                return res.status(500).json({Mensagem:"Erro interno do servidor"})
            }
                       
            const uploadDirectory = path.join(__dirname,results.insertId+'');
            
            if (!fs.existsSync(uploadDirectory)){
                fs.mkdirSync(uploadDirectory);
            }

            return res.status(201).json({Mensagem:"Curso cadastrado com sucesso",id_curso:results.insertId})

        })
        
    },
    obterUmCursoPorId:async(req,res)=>{
        finalistasController.addFinalista()
        const { accessToken ,id_curso} = req.body;

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

        const select_query_cursos = 'SELECT * FROM cursos WHERE id_curso = ? '
        const select_query_video  = 'SELECT * FROM videos WHERE id_curso = ?'

        db.query(select_query_cursos, [id_curso],(err,result)=>{

            if(err){
                console.log("Erro:"+err.message)
                return res.status(500).json({Mensagem:"Erro interno do servidor"})
            }

            if(result[0].modo=='pago' && modo=='gratuito'){
                return res.status(401).json("Seja um assinante para obter este curso")
            }

            db.query(select_query_video,[id_curso],(errr,results)=>{
               
               if(errr){
                 console.log("Erro:"+errr.message)
                 return res.status(500).json({Mensagem:"Erro interno do servidor"})
               }

               return res.status(200).json({curso:result,videos:results})

            })

        })
    },
    obterTodosCursos:async (res,req)=>{
        finalistasController.addFinalista()
      const { accessToken } = req.body;

        if(!accessToken){
            return res.status(400).json({Mensagem:"Campos incompletos"})
        }

        if(!await token.verificarTokenUsuario(accessToken)){
            return res.status(401).json({Mensagem:"Token invalido"})
        }   

        const select_query_cursos = 'SELECT * FROM cursos '

        db.query(select_query_cursos, (err, results) => {
        
            if(err){
                console.log("Erro:"+err.message)
                return results.status(500).json({Mensagem:"Erro interno do servidor"})
            }

            return res.status(200).json({cursos:results})
        
        })

    }
    ,
    obterTodosCursosMaisAssistidos:async (res,req)=>{
        finalistasController.addFinalista()
        const { accessToken } = req.body;
  
          if(!accessToken){
              return res.status(400).json({Mensagem:"Campos incompletos"})
          }
  
          if(!await token.verificarTokenUsuario(accessToken)){
              return res.status(401).json({Mensagem:"Token invalido"})
          }   
  
          const select_query_cursos = 'SELECT * FROM cursos '
  
          db.query(select_query_cursos, (err, results) => {
          
              if(err){
                  console.log("Erro:"+err.message)
                  return results.status(500).json({Mensagem:"Erro interno do servidor"})
              }



              
  
              return res.status(200).json({cursos:results})
          
          })
  
      }

}

module.exports = cursosControllers