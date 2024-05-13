const express = require('express');
const router = express.Router();

const videosControllers = require('../controllers/VideosControllers');

// Rota para cadastrar varios videos
router.post('/cadastrar', videosControllers.cadastrarVideos);
// Rota para obter um video
router.post('/obter_um', videosControllers.retornarVideo);
//Rota para registrar um video assistido
router.post('/registrar_assistidos',videosControllers.cadastrarVideoAssistido)
//obter todos videos de um curso
router.post('/obter_videos',videosControllers.obterTodosVideosDeUmCurso)
//Rota para obter todos videos assistidos
router.post('/obter_videos_assistidos',videosControllers.obterVideosAssistidosDeUmCurso)


module.exports = router;
