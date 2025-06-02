const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Resposta = sequelize.define('Resposta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_pergunta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'perguntas',
            key: 'id'
        }
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    resposta: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'respostas',
    timestamps: false
});

module.exports = Resposta; 