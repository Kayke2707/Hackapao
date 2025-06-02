const { Pergunta, Resposta } = require('../models/associations');

class QuizController {
    async listarPerguntas(req, res) {
        try {
            const perguntas = await Pergunta.findAll({
                include: [{
                    model: Resposta,
                    as: 'respostas'
                }]
            });
            return res.json(perguntas);
        } catch (erro) {
            return res.status(500).json({ erro: 'Erro ao listar perguntas' });
        }
    }

    async criarPergunta(req, res) {
        try {
            const { pergunta, respostas } = req.body;

            // Cria a pergunta
            const novaPergunta = await Pergunta.create({ pergunta });

            // Cria as respostas
            const respostasCriadas = await Promise.all(
                respostas.map(resposta => 
                    Resposta.create({
                        id_pergunta: novaPergunta.id,
                        texto: resposta.texto,
                        resposta: resposta.resposta
                    })
                )
            );

            return res.status(201).json({
                pergunta: novaPergunta,
                respostas: respostasCriadas
            });
        } catch (erro) {
            return res.status(500).json({ erro: 'Erro ao criar pergunta' });
        }
    }

    async verificarResposta(req, res) {
        try {
            const { id_pergunta, id_resposta } = req.body;

            const resposta = await Resposta.findOne({
                where: {
                    id: id_resposta,
                    id_pergunta
                }
            });

            if (!resposta) {
                return res.status(404).json({ erro: 'Resposta não encontrada' });
            }

            return res.json({ correta: resposta.resposta });
        } catch (erro) {
            return res.status(500).json({ erro: 'Erro ao verificar resposta' });
        }
    }
}

module.exports = new QuizController(); 