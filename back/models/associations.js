const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  acertos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  erros: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

const Pergunta = sequelize.define('Pergunta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pergunta: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Resposta = sequelize.define('Resposta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pergunta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  texto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resposta: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

// Definindo as associações
Pergunta.hasMany(Resposta, { foreignKey: 'id_pergunta' });
Resposta.belongsTo(Pergunta, { foreignKey: 'id_pergunta' });

module.exports = {
  Usuario,
  Pergunta,
  Resposta
}; 