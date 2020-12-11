import { CommentCreateDto } from '../dtos/comment.dto';
import { Comment } from './repositories/domain/comment';
import { ICommentRepository } from './repositories/icomment.repository';
export class CommentService{
    constructor(
        private readonly commentRepository: ICommentRepository
    ) {}

    public async PostComment(entry: CommentCreateDto ): Promise<void>{
        return await this.commentRepository.PostComment(entry as Comment);
    } 

    public async GetComment(moveId:number): Promise< Comment[]| null >{
        return await this.commentRepository.GetComment(moveId);
    }


}
