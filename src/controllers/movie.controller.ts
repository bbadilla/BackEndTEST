import { MovieService } from './../services/movie.service';
import { Request, Response } from 'express';
import { GET, POST, PUT, route } from "awilix-express";
import { calculate } from "./../common/utilities/calculate.function"
import { MovieCreateDto, MovieUpdateDto } from '../dtos/movie.dto';

@route('/api/')
export class MovieController{
    constructor(
        //dependency
        private readonly movieService: MovieService
    ){}

    // Get all movies
    @GET()
    public async GetAllMovies (req: Request, res: Response){
        res.send(
            await this.movieService.GetAllMovies()
        );
    }

    // Get movie by name
    @route('search/:name')
    @GET()
    public async GetMovie (req: Request, res: Response){
        const name = req.params.name;
        res.send(
            await this.movieService.GetMovie(name)
        );
    }

    // Add movie
    @route('add')
    @POST()
    public async PostMovie (req: Request, res: Response){
        await this.movieService.PostMovie({
                Name: req.body.Name,
                Director: req.body.Director,
                Year: req.body.Year,
                Gender: req.body.Gender,
                Languaje: req.body.Language,
                Favorite: req.body.Favorite,
                Community_Score: req.body.Community_Score,
                IMDB: req.body.IMDB,
                Style: req.body.Style,
                MetaScore: req.body.MetaScore,
                Popularity: req.body.Popularity,
                Image: req.body.Image
        } as unknown as  MovieCreateDto);
        res.send();
    }

    // Update movie
    @route('modify')
    @PUT()
    public async UpdateMovie (req: Request, res: Response){
        await this.movieService.UpdateMovie({
            ID: req.params.ID,
            Name: req.body.Name,
            Director: req.body.Director,
            Year: req.body.Year,
            Gender: req.body.Gender,
            Languaje: req.body.Language,
            Favorite: req.body.Favorite,
            IMDB: req.body.IMDB,
            Style: req.body.Style,
            MetaScore: req.body.MetaScore,
            Image: req.body.Image
        } as unknown as MovieUpdateDto);
        res.send();
    }

    // Get movie by name
    @route('gender/:gender/:d1/:d2/:d3/:d4/:d5')
    @GET()
    public async GetMovieGender (req: Request, res: Response){
        const gender = req.params.gender;
        const d1 = parseInt(req.params.d1);
        const d2 = parseInt(req.params.d2);
        const d3 = parseInt(req.params.d3);
        const d4 = parseInt(req.params.d4);
        const d5 = parseInt(req.params.d5);
        
        let result = await this.movieService.GetMovieGender(gender);

        // const x = calculate(d1, d2, d3, d4, d5, result);
        let avarage: string | any[] = [];

        for (var i = 0; i < result.length; i++){
            var grade = 0;
            grade += result[i].Community_Score * d1/10;
            grade += result[i].IMDB * d2/10;
            grade += result[i].MetaScore * d3/10;
            grade += result[i].Popularity * (d5/100);

            if(result[i].Favorite)
                grade += d4;

            avarage[i] = grade;
        }   

        for (var i = 0; i < result.length; i++){
            for(var j = 0 ; j < result.length - i - 1; j++){ 
                if (avarage[j] < avarage[j + 1]) {
                    // swap
                    var temp = avarage[j];
                    avarage[j] = avarage[j+1];
                    avarage[j + 1] = temp;

                    var temp1 = result[j];
                    result[j] = result[j+1];
                    result[j + 1] = temp1;
                }
            } 
        }
        result = result.slice(0,10);

        if (result.length == 0){
            res.json({
                'status': 204,
                'message': '0 movies found',
            })
        } else {
            res.send({
                result
            })
        }
        
    }

}