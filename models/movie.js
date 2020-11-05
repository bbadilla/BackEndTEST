'use strict'

const Sequelize = require('sequelize');
const db = require('../config/database');

const Movie = db.define('Movie', {
    ID:{
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    Director: {
        type: Sequelize.STRING,
        notEmpty:true
    },
    Year: {
        type: Sequelize.SMALLINT,
        notEmpty:true
    },
    Gender: {
        type: Sequelize.STRING,
        notEmpty:true
    },
    Language: {
        type: Sequelize.STRING,
        notEmpty:true
    },
    Favorite: {
        type: Sequelize.BOOLEAN,
        notEmpty:true
    },
    Community_Score: {
        type: Sequelize.FLOAT,
        notEmpty:true
    },
    IMDB: {
        type: Sequelize.FLOAT,
        notEmpty:false
    },
    Style: {
        type: Sequelize.STRING,
        notEmpty:true
    },
    MetaScore: {
        type: Sequelize.FLOAT,
        notEmpty:false
    },
    Popularity: {
        type: Sequelize.FLOAT,
        notEmpty:true
    },
    Image: {
        type: Sequelize.STRING,
        notEmpty:true
    }
})

module.exports = Movie;