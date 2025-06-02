const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Usuario, Pergunta, Resposta } = require('../models/associations');

// Rota de registro
router.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada
    });

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca o usuário
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      acertos: usuario.acertos,
      erros: usuario.erros
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Rota para buscar perguntas
router.get('/perguntas', async (req, res) => {
  try {
    const perguntas = await Pergunta.findAll({
      include: [{
        model: Resposta,
        attributes: ['id', 'texto']
      }]
    });
    res.json(perguntas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perguntas' });
  }
});

// Rota para verificar resposta
router.post('/verificar-resposta', async (req, res) => {
  try {
    const { id_pergunta, id_resposta, id_usuario } = req.body;

    const resposta = await Resposta.findOne({
      where: { id: id_resposta, id_pergunta }
    });

    if (!resposta) {
      return res.status(404).json({ error: 'Resposta não encontrada' });
    }

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (resposta.resposta) {
      await usuario.increment('acertos');
    } else {
      await usuario.increment('erros');
    }

    res.json({ 
      correta: resposta.resposta,
      acertos: usuario.acertos,
      erros: usuario.erros
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar resposta' });
  }
});

module.exports = router; 