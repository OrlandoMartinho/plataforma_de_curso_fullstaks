const express = require('express');
const router = express.Router();
const notificacoesController = require('../controllers/NotificacoesController');

// Rota para obter todas as notificações por token
router.post('/', notificacoesController.obterTodasNotificacoes);

// Rota para apagar todas notificação de um usuario
router.delete('/', notificacoesController.apagarTodasNotificacoes);

module.exports = router;
