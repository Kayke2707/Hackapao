const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Pergunta = sequelize.define('Pergunta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    pergunta: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'perguntas',
    timestamps: false
});

module.exports = Pergunta; 