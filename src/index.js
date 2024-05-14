const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require('path')
const servidor=require('./private/servidor.json')
const token=require('./utils/token')
const app = express();
const finalistasController=require('./controllers/FinalistasController')
 
app.use(bodyParser.json());
app.use(cors());




// Importar as rotas
const usersRoutes = require('./routes/UserRoutes');
const notificacoesRoutes = require('./routes/NotificacoesRoutes');
const cursosRoutes=require('./routes/CursosRoutes')
const videosRoutes=require('./routes/VideosRoutes')
const finalistasRoutes=require('./routes/FinalistasRoutes')

// Adicionar rotas

app.use('/usuarios', usersRoutes);
app.use('/cursos',cursosRoutes)
app.use('/notificacoes', notificacoesRoutes);
app.use('/videos',videosRoutes)
app.use('/finalistas',finalistasRoutes)

app.use(express.static(path.join(__dirname,'..', 'public')));
 
// Rota para retornar a página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
});

app.post('/', (req, res) => {
  const {accessToken}=req.body
    token.verificarTokenUsuario(accessToken).then(resultado => {
      if(resultado){
        res.status(201).json({mensagem:true})
      }else{
        res.status(201).json({mensagem:false})
      }
     })
    .catch(erro => {
      console.error(erro);
      res.status(500).json({mensagem:"Erro interno do servidor"})
     });

});


// Iniciar o servidor
const PORT = process.env.PORT||servidor.PORT;
const HOST=process.env.HOST||servidor.HOST
const PROTOCOL=process.env.PROTOCOL||servidor.PROTOCOL
finalistasController.addFinalista()
// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em ${PROTOCOL}://${HOST}:${PORT}/`);
});
