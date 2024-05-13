const express = require('express');
const router = express.Router();
const finalistasController = require('../controllers/FinalistasController');

// Rota para cadastrar certificado
router.post('/cadastrar_certificado', finalistasController.cadastrarCertificado);
// Rota para obter todos certificados
router.post('/obter_todos_certificados', finalistasController.obterTodosCertificados);
//Rota para obter todos finalistas
router.post('/obter_todos_finalistas',finalistasController.obterTodosFinalistas)
//Rota para obter um certificado
router.post('/obter_certificado',finalistasController.retornarCertificado)



module.exports = router;
