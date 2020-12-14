import { MovieRepository } from './repositories/movie.repository';
import { ApplicationException } from '../common/exception/application.exception';
import { CommentCreateDto } from '../dtos/comment.dto';
import { Comment } from './repositories/domain/comment';
import { ICommentRepository } from './repositories/icomment.repository';
import e from 'express';
export class CommentService{
    constructor(
        private readonly commentRepository: ICommentRepository,
        private readonly movieRepository: MovieRepository
    ) {}

    public async PostComment(entry: CommentCreateDto ): Promise<void>{
        if(entry.MovieID && await this.movieRepository.GetMovieID(entry.MovieID)){
            return await this.commentRepository.PostComment(entry as Comment);
        } else {
            throw new ApplicationException("Please insert id of valid movie")
        }
    } 

    public async GetComment(moveId:number): Promise< Comment[]| null >{
        if(moveId && await this.movieRepository.GetMovieID(moveId)){
            return await this.commentRepository.GetComment(moveId);
        } else {
            throw new ApplicationException("Please insert id of valid movie")
        }
    }


}
