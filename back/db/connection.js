const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('quizhack', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Testa a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
    process.exit(1); // Encerra o processo se não conseguir conectar
  });

module.exports = { sequelize }; 