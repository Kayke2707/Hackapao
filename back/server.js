const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db/connection');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', routes);

// Sincroniza o banco de dados
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
  });
}).catch(error => {
  console.error('Erro ao sincronizar o banco de dados:', error);
}); 