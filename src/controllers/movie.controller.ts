import { MovieService } from './../services/movie.service';
import { Request, Response } from 'express';
import { GET, POST, PUT, route } from "awilix-express";
import { calculate } from "./../common/utilities/calculate.function"
import { MovieGetDto, MovieCreateDto, MovieUpdateDto } from '../dtos/movie.dto';


@route('/api/')
export class MovieController{
    constructor(
        //dependency
         private readonly movieService: MovieService
    ){}

    // Get all movies
    @GET()
    public async GetAllMovies (req: Request, res: Response){

        const result = await this.movieService.GetAllMovies();

        if (result.length) {
            res.json({
                'status': 200,
                'message': 'Getting movies successfully',
                'data': result as unknown as MovieGetDto
            })
        } else {
            res.json({
                'status': 404,
                'message': 'Error of getting movies',
            })
        }
    }

    // Get movie by name
    @route('search/:name')
    @GET()
    public async GetMovie (req: Request, res: Response){
        const name = req.params.name;
        const result = await this.movieService.GetMovie(name) 
        if (result.length) {
            res.json({
                'status': 200,
                'message': 'Getting movies successfully',
                'data': result as unknown as MovieGetDto
            })
        } else {
            res.json({
                'status': 204,
                'message': '0 movies found',
            })
        }
    }

    // Add movie
    @route('add')
    @POST()
    public async PostMovie (req: Request, res: Response){
        try{
            var params = req.body;
            var post_params: MovieCreateDto = {
                Name: params.Name,
                Director: params.Director,
                Year: params.Year,
                Gender: params.Gender,
                Language: params.Language,
                Favorite: params.Favorite,
                Community_Score: params.Community_Score,
                IMDB: params.IMDB,
                Style: params.Style,
                MetaScore: params.MetaScore,
                Popularity: params.Popularity,
                Image: params.Image};

            await this.movieService.PostMovie(post_params);
            res.json({
                'status': 200,
                'message': 'Adding movies successfully',
            });
        } catch {
            res.json({
                'status': 404,
                'message': 'Error of create movie',
            });
        }
    }

    // Update movie
    @route('modify')
    @PUT()
    public async UpdateMovie (req: Request, res: Response){
        try {
            var params = req.body;
            var put_params: MovieUpdateDto = {
                ID: parseInt(params.ID),
                Name: params.Name,
                Director: params.Director,
                Year: params.Year,
                Gender: params.Gender,
                Language: params.Language,
                Favorite: params.Favorite,
                IMDB: params.IMDB,
                Style: params.Style,
                MetaScore: params.MetaScore,
                Image: params.Image
            }
            await this.movieService.UpdateMovie(put_params);
            res.json({
                'status': 200,
                'message': 'Modify Movie successfully',
            });
        } catch {
            res.json({
                'status': 404,
                'message': 'Error of modify movie',
            });
        }
        
    }

    // Get movie by name
    @route('gender/:gender/:d1/:d2/:d3/:d4/:d5')
    @GET()
    public async GetMovieGender (req: Request, res: Response){
        const params = req.params;
        const gender = params.gender;
        const d1 = parseInt(params.d1);
        const d2 = parseInt(params.d2);
        const d3 = parseInt(params.d3);
        const d4 = parseInt(params.d4);
        const d5 = parseInt(params.d5);
        
        let result = await this.movieService.GetMovieGender(gender);

        const calculte_result = await calculate(d1, d2, d3, d4, d5, result) as unknown as MovieGetDto;

        if (result.length == 0){
            res.json({
                'status': 204,
                'message': '0 movies found',
            })
        } else {
            res.json({
                'status': 200,
                'message': 'Searching movies successfully',
                'data': calculte_result
            })
        }
        
    }

}