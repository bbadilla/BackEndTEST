'use strict'

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Movie = require('./models/movie');

// Database 
const db = require('./config/database');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err))

const app = express();
app.use(cors());

// Cargar rutas
const movie_routes = require('./routes/movie');
const comment_routes = require('./routes/comment');

app.get('/', (req, res) =>
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

// Middlewares
/* app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Routes
app.use('/api', movie_routes);
app.use('/api', comment_routes); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

// Exportar modulo 
module.exports = app;