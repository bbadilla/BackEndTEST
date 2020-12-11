import { MovieRepository } from './../../movie.repository';
import connector from "../../../../common/persistence/mssql.persistence";
import { Movie } from "../../domain/movie";
import e from 'express';

export class MovieMssqlRepository implements MovieRepository{
    
    public async GetAllMovies(): Promise<Movie[]>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM Movie ORDER BY ID DESC`;

        return result.recordset;
    }

    public async GetMovie(name: string): Promise<Movie[] | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM Movie WHERE Name LIKE '%' + ${name} + '%'`;

        if (result.rowsAffected) {
            return result.recordset;
        }

        return null;
    }

    public async PostMovie(entry: Movie ): Promise<void> {
        const pool = await connector;
        
        await pool.query
            `INSERT INTO Movie(Name, Director, Year, Gender, Language, Favorite, Community_Score, IMDB, 
                                                                    Style, MetaScore, Popularity, Image)
             VALUES(${entry.Name}, ${entry.Director}, ${entry.Year}, ${entry.Gender}, ${entry.Language},
                    ${entry.Favorite}, ${entry.Community_Score}, ${entry.IMDB}, ${entry.Style}, 
                    ${entry.MetaScore}, ${entry.Popularity}, ${entry.Image})`
    }

    public async UpdateMovie(entry: Movie): Promise<void>{
        const pool = await connector;
        await pool.query
            `UPDATE Movie
            SET Name = ${entry.Name},
                Director = ${entry.Director},
                Year = ${entry.Year}, 
                Gender = ${entry.Gender}, 
                Language = ${entry.Language}, 
                Favorite = ${entry.Favorite}, 
                IMDB = ${entry.IMDB}, 
                Style = ${entry.Style}, 
                MetaScore = ${entry.MetaScore}, 
                Image = ${entry.Image}
            WHERE ID = ${entry.ID};`
    }

    public async GetMovieGender(gender: string): Promise<Movie[] | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM Movie WHERE Gender LIKE '%' + ${gender} + '%'`;

        if (result.rowsAffected) {
            return result.recordset;
        }

        return null;
    }
}