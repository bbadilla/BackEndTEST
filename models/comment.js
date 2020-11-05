'use strict'

const Sequelize = require('sequelize');
const db = require('../config/database');

const Comment = db.define('Comments', {
    ID:{
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    Body: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    Score: {
        type: Sequelize.INTEGER,
        notEmpty:true
    },
    MovieID: {
        type: Sequelize.INTEGER,
        notEmpty:true,
        references: 'Movie',
        referencesKey: 'ID'
    }
})

module.exports = Comment;