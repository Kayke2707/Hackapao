const { Usuario } = require('../models/associations');
const bcrypt = require('bcrypt');

class UsuarioController {
    async criar(req, res) {
        try {
            const { nome, email, senha, img } = req.body;
            
            // Verifica se o usuário já existe
            const usuarioExistente = await Usuario.findOne({ where: { email } });
            if (usuarioExistente) {
                return res.status(400).json({ erro: 'Email já cadastrado' });
            }

            // Criptografa a senha
            const senhaCriptografada = await bcrypt.hash(senha, 10);

            // Cria o usuário
            const usuario = await Usuario.create({
                nome,
                email,
                senha: senhaCriptografada,
                img
            });

            return res.status(201).json(usuario);
        } catch (erro) {
            return res.status(500).json({ erro: 'Erro ao criar usuário' });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            // Busca o usuário
            const usuario = await Usuario.findOne({ where: { email } });
            if (!usuario) {
                return res.status(401).json({ erro: 'Usuário não encontrado' });
            }

            // Verifica a senha
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: 'Senha inválida' });
            }

            // Retorna os dados do usuário (exceto senha)
            const { senha: _, ...dadosUsuario } = usuario.toJSON();
            return res.json(dadosUsuario);
        } catch (erro) {
            return res.status(500).json({ erro: 'Erro ao fazer login' });
        }
    }

    async atualizarPontuacao(req, res) {
        try {
            const { id } = req.params;
            const { acertos, erros } = req.body;

            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }

            await usuario.update({
                acertos: usuario.acertos + acertos,
                erros: usuario.erros + erros
            });

            return res.json(usuario);
        } catch (erro) {
            return res.status(500).json({ erro: 'Erro ao atualizar pontuação' });
        }
    }
}

module.exports = new UsuarioController(); 