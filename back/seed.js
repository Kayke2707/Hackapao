const { Pergunta, Resposta } = require('./models/associations');
const { sequelize } = require('./db/connection');

const perguntas = [
  {
    pergunta: "Em 'God of War' (2018), qual é o nome do filho de Kratos?",
    respostas: [
      { texto: "Atreus", resposta: true },
      { texto: "Loki", resposta: false },
      { texto: "Baldur", resposta: false },
      { texto: "Thor", resposta: false }
    ]
  },
  {
    pergunta: "Qual desses jogos é um battle royale?",
    respostas: [
      { texto: "Elden Ring", resposta: false },
      { texto: "Fortnite", resposta: true },
      { texto: "The Sims", resposta: false },
      { texto: "Hollow Knight", resposta: false }
    ]
  },
  {
    pergunta: "Qual desses jogos é conhecido por seu estilo sombrio e dificuldade elevada?",
    respostas: [
      { texto: "Stardew Valley", resposta: false },
      { texto: "Dark Souls", resposta: true },
      { texto: "Rocket League", resposta: false },
      { texto: "Animal Crossing", resposta: false }
    ]
  }
];

async function seed() {
  try {
    // Limpa as tabelas
    await Resposta.destroy({ where: {} });
    await Pergunta.destroy({ where: {} });

    // Insere as perguntas e respostas
    for (const perguntaData of perguntas) {
      const pergunta = await Pergunta.create({
        pergunta: perguntaData.pergunta
      });

      await Promise.all(
        perguntaData.respostas.map(resposta =>
          Resposta.create({
            id_pergunta: pergunta.id,
            texto: resposta.texto,
            resposta: resposta.resposta
          })
        )
      );
    }

    console.log('Banco de dados populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    process.exit();
  }
}

seed(); 