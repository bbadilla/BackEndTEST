import { CommentMockRepository } from './../services/repositories/impl/mock/comment.repository';
import { CommentService } from './../services/comment.service';
import assert = require('assert');
import { CommentCreateDto } from '../dtos/comment.dto';
import { MovieMockRepository } from '../services/repositories/impl/mock/movie.repository';

const commentService = new CommentService(
    new CommentMockRepository(),
    new MovieMockRepository()
);

describe('Comment Service', () => {
    describe('Get method of comment', () => {
        it('Get comments of specific movie', async () => {
            await commentService.GetComment(1);
        })

        it('Get comments of movie that does not exist', async () => {
            try{
                await commentService.GetComment(99);
            } catch (error) {
                assert.equal(error.message, 'Please insert id of valid movie')
            }
        })
    })

    describe('Insert method of comment', () => {
        it('Insert comment of movie', async () => {
            await commentService.PostComment({
                Body: "Good Film",
                Score: 10,
                MovieID: 1
            } as CommentCreateDto)
        })

        it('Insert comment of movie does not exist', async () => {
            try{
                await commentService.PostComment({
                    Body: "Good Film",
                    Score: 10,
                    MovieID: 99
                } as CommentCreateDto)
            } catch (error) {
                assert.equal(error.message, 'Please insert id of valid movie')
            }
        })
    })
})