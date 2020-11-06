'use strict'

const validator = require('validator');
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Comment = require('../models/comment');
const Movie = require('../models/movie');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Insert comment
router.post('/add_comment/:comment/:score/:id_movie', (req, res) => {
    var data_comment = req.params.comment;
    var data_score = req.params.score;
    var data_id_movie = req.params.id_movie;

    console.log(req.params); 

    db.query(`InsertComment @comment= '${data_comment}', @score= ${data_score}, @movieID= ${data_id_movie};`)
    .then(results => {
        res.json({
            'status': 200,
            'message': 'Add comment successfully',
        })
    })
    .catch((error) => {
        console.log(error);
        res.json({
            'status': 404,
            'message': 'Error insertando el comentario',
        })
    })
})

// Get comments
router.get('/get_comments/:movie_id', (req, res) => {
    var data_movie_id = req.params.movie_id;
    db.query(`getMovieScore @movieID= ${data_movie_id};`)
    db.query(`getComments @movieID= ${data_movie_id};`)
    .then(results => {
        res.json({
            'status': 200,
            'message': 'Get comment successfully',
            'data': results
        })
    })
    .catch((error) => {
        console.log(error);
        res.json({
            'status': 404,
            'message': 'Error obteniendo comentarios',
        })
    })
})

module.exports = router;