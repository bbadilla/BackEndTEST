'use strict'

const Sequelize = require('sequelize');

module.exports = new Sequelize('mymovie', 'soa41d', 'soad1234@',{
    host: 'mymovie.database.windows.net',
    dialect: 'mssql',
    operatorAliases: false,
    define:{
        timestamps: false,
        freezeTableName: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});