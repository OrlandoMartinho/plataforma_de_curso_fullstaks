const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UserController');

//Rota para receber código de verificação
router.post('/verificar_email',UsersController.receberCodigo)
//Rota para cadastrar Usuario
router.post('/cadastrar', UsersController.cadastrarUsuario);
//Rota para Autenticar usuários
router.post('/login', UsersController.autenticarUsuario);
//Rota para obter usuários  
router.post('/todos_usuarios_assinados',UsersController.obterTodosUsuariosPorAssinatura)
//Rota para Editar Usuario
router.put('/editar_dados',UsersController.editarUsuario)
//Verificar Email Novo_token
router.put('/alterar_senha',UsersController.editarSenha)
//Editar Assinatura
router.put('/pedir_assinatura',UsersController.editarAssinatura)
//Confirmar Assinatura
router.put('/confirmar_assinatura',UsersController.confirmarAssinatura)
//Revogar Assinatura
router.put('/revogar_assinatura',UsersController.revogarAssinatura)
//Rotas para eliminar Usuario
router.delete('/',UsersController.eliminarUsuario)
// Rota para obter usuário por accessToken
router.post('/obter_usuario_por_token', UsersController.obterUsuarioPorAccessToken);
//Rota para Receber codigo para resetar a Password
router.post('/receber_codigo_de_reset', UsersController.receberCodigoParaResetarSenha)
//Rota para Receber codigo para alterar Password
router.post('/alterar_senha', UsersController.receberCodigoParaResetarSenha)

router.post('/obter_comprovativo/:nomeDoArquivo', UsersController.retornarComprovativo)

module.exports = router;
