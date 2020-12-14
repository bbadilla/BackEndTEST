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
        }
    ],
    movieID:0,

    comment:[
        {
            "ID": 1,
            "Body": "Good movie",
            "Score": 8,
            "MovieID": 1
        }, 
        {
            "ID": 1,
            "Body": "I love this movie",
            "Score": 10,
            "MovieID": 1
        },
        {
            "ID": 2,
            "Body": "Bad movie",
            "Score": 2,
            "MovieID": 2
        }
    ],
    commentID:0
};

db.movieID = db.movie.length;
db.commentID = db.comment.length;

export default db;