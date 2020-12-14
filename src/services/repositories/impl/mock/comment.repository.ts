import { ICommentRepository } from './../../icomment.repository';
import db from "../../../../common/persistence/mock.persistence";
import { Comment } from "../../domain/comment";

export class CommentMockRepository implements ICommentRepository{
    
    public async PostComment(entry: Comment ): Promise<void>{
        const table = db.comment as Comment[];
        db.commentID++;
        table.push({
            ID: db.commentID,
            Body: entry.Body,
            Score: entry.Score,
            MovieID: entry.MovieID
        }) as unknown as Comment;
    }

    public async GetComment(commentID: number): Promise<Comment[] | null>{
        const table = db.comment as Comment[];
        const result = table.find(x => x.ID == commentID);

        if (result) {
            return Object.assign({...result});
        }

        return null;
    }
}