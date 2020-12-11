import { Comment } from "./domain/comment";

export interface ICommentRepository{
    // methods
    PostComment(entry: Comment ): Promise<void>;
    GetComment(movieId: number): Promise<Comment[] | null>;
}