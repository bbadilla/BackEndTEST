import { Comment } from "./domain/comment";

// Interface of Comment Repository
export interface ICommentRepository{
    // Methods
    PostComment(entry: Comment ): Promise<void>;
    GetComment(movieId: number): Promise<Comment[] | null>;
}