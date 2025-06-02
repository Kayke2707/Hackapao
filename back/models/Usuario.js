const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(215),
        allowNull: false
    },
    img: {
        type: DataTypes.BLOB('medium'),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(215),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(215),
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
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario; 