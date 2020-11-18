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
            'error': error
        })
    })
)
// Add a movie
router.post('/add', (req, res) => {
    let {
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
        Image
    } = req.body;

    Movie.update({
            Name: Name,
            Director: Director,
            Year: Year,
            Gender: Gender,
            Language: Language,
            Favorite: Favorite,
            IMDB: IMDB,
            Style: Style,
            MetaScore: MetaScore,
            Image: Image
        }, {
            where: {
                ID: ID
            }
        })
        .then(() => res.json({
            'status': 200,
            'message': 'Update movies successfully',
            'data': req.body
        }))
});
// Search by gender
router.get('/gender/:data/:p1/:p2/:p3/:p4/:p5', async (req, res) => {
    var data_gender = req.params.data;
    var data_p1 = req.params.p1;
    var data_p2 = req.params.p2;
    var data_p3 = req.params.p3;
    var data_p4 = req.params.p4;
    var data_p5 = req.params.p5;


    var avarage = [];

    console.log(req.params);

    var result = await Movie.findAll({
        raw: true,
        where: {
            Gender: {
                [Op.like]: '%' + data_gender + '%'
            }
        }
    });

    // ################################################################################
    for (var i = 0; i < result.length; i++){
        var grade = 0;
        grade += result[i].Community_Score * data_p1/10;
        grade += result[i].IMDB * data_p2/10;
        grade += result[i].MetaScore * data_p3/10;
        grade += result[i].Favorite * data_p4;
        grade += result[i].Popularity * (data_p5/100);

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
    avarage = avarage.slice(0,10);
    
    result.forEach((element, index) => {
        element['Avarage'] = avarage[index];
    });

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
