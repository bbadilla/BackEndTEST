import { CommentService } from './../services/comment.service';
import { Request, Response } from 'express';
import { GET, POST, PUT, route } from "awilix-express";
import { CommentCreateDto } from '../dtos/comment.dto';

@route('/api/')
export class CommentController{
    constructor(
        //dependency
         private readonly commentService: CommentService
    ){}

    // Get comment
    @route('get_comments/:movie_id')
    @GET() 
    public async GetComment (req: Request, res: Response){
        const id = parseInt(req.params.movie_id);
        res.json({
            'status': 200,
            'message': 'Get comment successfully',
            'data': await this.commentService.GetComment(id) as unknown as CommentCreateDto
        });
    }

    // Add comments
    @route('add_comment')
    @POST()
    public async PostComment (req: Request, res: Response){
        var params = req.body;
        var post_params: CommentCreateDto = {
            Body: params.comment,
            Score: params.score,
            MovieID: params.id_movie
        }
        console.log(post_params);

        await this.commentService.PostComment(post_params);

        res.json({
            'status': 200,
            'message': 'Add comment successfully'
        });
    }

}