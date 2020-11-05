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
router.post('/add_comment', (req, res) => {
    let {
        NameMovie,
        ID,
        Body,
        Score,
        MovieID,
        id_movie
    } = req.body;

    Movie.findOne({
        attributes: ['ID'],
        where: {
            Name: {
                [Op.like]: '%' + NameMovie + '%'
            }
        }
    })
    .then(movies => {
        if (movies.length == 0) {
            res.json({
                'status': 204,
                'message': '0 movies found',
            })
        }
        res.json({
            'status': 200,
            'message': 'Searching movies successfully',
            'data': movies
        })

    })
    .catch(() => res.json({
        'status': 404,
        'message': 'Faltan datos por enviar',
    }))

    // // Data Validation
    // try {
    //     var validate_body = !validator.isEmpty(Body);
    //     var validate_score = !validator.isEmpty(Score);

    // } catch (err) {
    //     return res.json({
    //         'status': 404,
    //         'message': 'Faltan datos por enviar'
    //     });
    // }

    // if (validate_body && validate_score){
    //     Comment.create({
    //         ID: req.body.ID,
    //         Body: req.body.Body,
    //         Score: req.body.Score,
    //         MovieID: req.body.MovieID,
    //     }, {
    //         where: {
    //             ID : req.body.ID
    //         }
    //     })
    //     .then(comment => res.json({
    //         'status': 200,
    //         'message': 'Adding movies successfully',
    //     }))

    // }

})

module.exports = router;