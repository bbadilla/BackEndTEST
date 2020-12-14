import { IMovieRepository } from '../../imovie.repository';
import connector from "../../../../common/persistence/mssql.persistence";
import { Movie } from "../../domain/movie";

// Repository of Movie for MSSQL
export class MovieMssqlRepository implements IMovieRepository{
    
    // Get movies from DB
    public async GetAllMovies(): Promise<Movie[]>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM Movie ORDER BY ID DESC`;

        return result.recordset;
    }

    // Get specific movie by name from DB
    public async GetMovie(name: string): Promise<Movie[] | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM Movie WHERE Name LIKE '%' + ${name} + '%'`;

        if (result.rowsAffected) {
            return result.recordset;
        }

        return null;
    }

    // Get specific movie by id from DB
    public async GetMovieID(id: number): Promise<Movie[] | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM Movie WHERE ID = ${id} `;

        if (result.rowsAffected) {
            return result.recordset;
        }

        return null;
    }

    // Create new movie in DB
    public async PostMovie(entry: Movie ): Promise<void> {
        const pool = await connector;
        
        await pool.query
            `INSERT INTO Movie(Name, Director, Year, Gender, Language, Favorite, Community_Score, IMDB, 
                                                                    Style, MetaScore, Popularity, Image)
             VALUES(${entry.Name}, ${entry.Director}, ${entry.Year}, ${entry.Gender}, ${entry.Language},
                    ${entry.Favorite}, ${entry.Community_Score}, ${entry.IMDB}, ${entry.Style}, 
                    ${entry.MetaScore}, ${entry.Popularity}, ${entry.Image})`
    }

    // Update movie from DB
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

    // Get movie by gender from DB
    public async GetMovieGender(gender: string): Promise<Movie[] | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM Movie WHERE Gender LIKE '%' + ${gender} + '%'`;

        if (result.rowsAffected) {
            return result.recordset;
        }

        return null;
    }
}