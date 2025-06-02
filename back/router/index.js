const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/UsuarioController');
const QuizController = require('../controller/QuizController');

// Rotas de usuário
router.post('/usuarios', UsuarioController.criar);
router.post('/login', UsuarioController.login);
router.put('/usuarios/:id/pontuacao', UsuarioController.atualizarPontuacao);

// Rotas do quiz
router.get('/perguntas', QuizController.listarPerguntas);
router.post('/perguntas', QuizController.criarPergunta);
router.post('/verificar-resposta', QuizController.verificarResposta);

module.exports = router; 