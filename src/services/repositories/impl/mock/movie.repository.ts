import { MovieRepository } from './../../movie.repository';
import db from "../../../../common/persistence/mock.persistence";
import { Movie } from "../../domain/movie";

export class MovieMockRepository implements MovieRepository{
    
    public async GetAllMovies(): Promise<Movie[]>{
        const table = db.movie as Movie[];
        return Object.assign([...table]);
        
    }

    public async GetMovie(name: string): Promise<Movie[] | null>{
        const table = db.movie as Movie[];
        const result = table.find(x => x.Name == name);

        if (result) {
            return Object.assign({...result});
        }

        return null;
    }

    public async GetMovieID(id: number): Promise<Movie[] | null>{
        const table = db.movie as Movie[];
        const result = table.find(x => x.ID == id);

        if (result) {
            return Object.assign({...result});
        }

        return null;
    }

    public async PostMovie(entry: Movie ): Promise<void> {
        const table = db.movie as Movie[];
        db.movieID++;
        table.push({
            ID: db.movieID,
            Name: entry.Name,
            Director: entry.Director,
            Year: entry.Year,
            Gender: entry.Gender,
            Language: entry.Language,
            Favorite: entry.Favorite,
            Community_Score: entry.Community_Score,
            IMDB: entry.IMDB,
            Style: entry.Style,
            MetaScore: entry.MetaScore,
            Popularity: entry.Popularity,
            Image: entry.Image,
            Avarage: null
        }) as unknown as Movie;

    }

    public async UpdateMovie(entry: Movie): Promise<void>{
        const table = db.movie as Movie[];
        const originalEntry = table.find(x => x.ID == entry.ID);
        if(originalEntry){
            originalEntry.ID = db.movieID;
            originalEntry.Name = entry.Name;
            originalEntry.Director = entry.Director;
            originalEntry.Year = entry.Year;
            originalEntry.Gender = entry.Gender;
            originalEntry.Language = entry.Language;
            originalEntry.Favorite = entry.Favorite;
            originalEntry.IMDB = entry.IMDB;
            originalEntry.Style = entry.Style;
            originalEntry.MetaScore = entry.MetaScore;
            originalEntry.Image = entry.Image;
        }
        
    }

    public async GetMovieGender(gender: string): Promise<Movie[] | null>{
        const table = db.movie as Movie[];
        const result = table.find(x => x.Gender == gender);

        if (result) {
            return Object.assign({...result});
        }

        return null;
    }
}