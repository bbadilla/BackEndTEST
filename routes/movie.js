'use strict'

const logic = ('../logic/functions');
const validator = require('validator');
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Movie = require('../models/movie');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// ################################################ Routes ################################# //
// Get movie list
router.get('/', (req, res) =>
    Movie.findAll({
        raw: true
    })
    .then(movies => {
        res.json({
            'status': 200,
            'message': 'Getting movies successfully',
            'data': movies
        })
    })
    .catch((error) => {
        console.log(error);
        res.json({
            'status': 500,
            'message': 'Getting movies failed',
        })
    })
)
// Add a movie
router.post('/add', (req, res) => {
    let {
        ID,
        Name,
        Director,
        Year,
        Gender,
        Language,
        Favorite,
        Community_Score,
        IMDB,
        Style,
        MetaScore,
        Popularity,
        Image
    } = req.body;

    console.log(req.body);

    //Insert into table
    Movie.create({
            ID,
            Name,
            Director,
            Year,
            Gender,
            Language,
            Favorite,
            Community_Score,
            IMDB,
            Style,
            MetaScore,
            Popularity,
            Image
        })
        .then(movie => res.json({
            'status': 200,
            'message': 'Adding movies successfully',
            'data': movie,
        }))
        .catch(err => {
            console.log(err);
            res.json({
                'status': 404,
                'message': 'Faltan datos por enviar',
                'error': err,
            })
        });
});

// Search for name
router.get('/search/:data', (req, res) => {
    var data_name = req.params.data;

    Movie.findAll({
            raw: true,
            where: {
                Name: {
                    [Op.like]: '%' + data_name + '%'
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
        .catch((error) => {
            console.log(error);
            res.json({
                'status': 404,
                'message': 'Faltan datos por enviar',
            })
        })
});

//Modify movie
router.put('/modify', (req, res) => {
    let {
        ID,
        Name,
        Director,
        Year,
        Gender,
        Language,
        Favorite,
        IMDB,
        Style,
        MetaScore,
        Popularity,
        Image
    } = req.body;

    // Data Validation
    try {
        var validate_name = !validator.isEmpty(Name);
        var validate_director = !validator.isEmpty(Director);
        var validate_year = !validator.isEmpty(Year);
        var validate_genre = !validator.isEmpty(Gender);
        var validate_language = !validator.isEmpty(Language);
        var validate_favorite = !validator.isEmpty(Favorite);
        var validate_image = !validator.isEmpty(Image);
        var validate_style = !validator.isEmpty(Style);
        var validate_popularity = !validator.isEmpty(Popularity);

    } catch (err) {
        console.log(err);
        return res.json({
            'status': 404,
            'message': 'Faltan datos por enviar',
            'error': err,

        });
    }

    if (validate_name && validate_director && validate_year && validate_genre && validate_language && validate_favorite && validate_image && validate_style && validate_popularity) {
        // Update Arguments 
        // Posibles cambios con respecto a la vista web
        Movie.update({
                Name: req.body.Name,
                Director: req.body.Director,
                Year: req.body.Year,
                Gender: req.body.Gender,
                Language: req.body.Language,
                Favorite: req.body.Favorite,
                IMDB: req.body.IMDB,
                Style: req.body.Style,
                MetaScore: req.body.MetaScore,
                Image: req.body.Image
            }, {
                where: {
                    ID: req.body.ID
                }
            })
            .then(movie => res.json({
                'status': 200,
                'message': 'Adding movies successfully',
            }))
    }
});
// Search by gender
router.get('/gender/:data', async (req, res) => {
    var data_gender = req.params.data;
    var avarage = [];
    var order_movies = []
    console.log(data_gender);


    var result = await Movie.findAll({
        raw: true,
        where: {
            Gender: {
                [Op.like]: '%' + data_gender + '%'
            }
        }
    });

    var p1 = 30; var p2 = 20; var p3 = 10; var p4 = 30; var p5 = 10;
    var points = [p1, p2, p3, p4, p5];

    // ################################################################################
    for (var i = 0; i < result.length; i++){
        var grade = 0;
        grade += result[i].Community_Score * points[0]/10;
        grade += result[i].IMDB * points[1]/10;
        grade += result[i].MetaScore * points[2]/10;
        grade += result[i].Favorite * points[3];
        grade += result[i].Popularity * (points[4]/100);

        avarage[i] = grade;
    }   

    for (var i = 0; i < result.length; i++){
        for(var j = 0 ; j < result.length - i - 1; j++){ 
            if (avarage[j] < avarage[j + 1]) {
                // swap
                var temp = avarage[j];
                avarage[j] = avarage[j+1];
                avarage[j + 1] = temp;

                var temp1 = result[j];
                result[j] = result[j+1];
                result[j + 1] = temp1;
            }
        } 
    }
    result = result.slice(0,10);

    // ################################################################################

    if (result.length == 0){
        res.json({
            'status': 204,
            'message': '0 movies found',
        })
    } else {
        res.json({
            'status': 200,
            'message': 'Searching movies successfully',
            'data': result
        })
    }
});


module.exports = router;