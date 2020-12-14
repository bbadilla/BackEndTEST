import { Movie } from './../../services/repositories/domain/movie';
const db = {
    movie: [{
        "ID": 1,
        "Name": "WALL-E",
        "Director": "JoseK21",
        "Year": 2008,
        "Gender": "Action",
        "Language": "English",
        "Favorite": true,
        "Community_Score": 7.9,
        "IMDB": 8.4,
        "Style": "Classical Hollywood cinema",
        "MetaScore": 9,
        "Popularity": 45,
        "Image": "https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-Eposter.jpg"
    },
    {
        "ID": 2,
        "Name": "Batman",
        "Director": "Christopher Nolan",
        "Year": 2000,
        "Gender": "Aventura",
        "Language": "French",
        "Favorite": true,
        "Community_Score": 4,
        "IMDB": null,
        "Style": "heroes",
        "MetaScore": null,
        "Popularity": 35,
        "Image": "https://upload.wikimedia.org/wikipedia/en/f/f0/Batman_Gotham_Knight.jpg"
    }],
    movieID:0
};

db.movieID = db.movie.length;

export default db;