import { ICommentRepository } from './../../icomment.repository';
import connector from "../../../../common/persistence/mssql.persistence";
import { Comment } from "../../domain/comment";

// Repository of comment for DB
export class CommentMssqlRepository implements ICommentRepository{

    // Add new comments in DB
    public async PostComment(entry: Comment ): Promise<void> {
        const pool = await connector;
        console.log(entry.Body);
        await pool.query`InsertComment @comment= ${entry.Body}, @score= ${entry.Score}, @movieID= ${entry.MovieID}`
        await pool.query`getMovieScore @movieID = ${entry.MovieID}`
        await pool.query`updatePopularity;`
    }

    // Get Comments from DB
    public async GetComment(movieId: number): Promise<Comment[] | null>{
        const pool = await connector;

        const result = await pool.query`getComments @movieID = ${movieId}`

        if (result.rowsAffected) {
            return result.recordset;
        }

        return null;
    }
}