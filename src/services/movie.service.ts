import { ApplicationException } from './../common/exception/application.exception';
import { MovieCreateDto, MovieUpdateDto } from '../dtos/movie.dto';
import { Movie } from './repositories/domain/movie';
import { IMovieRepository } from './repositories/imovie.repository';

// Movie Service
export class MovieService{
    constructor(
        private readonly movieRepository: IMovieRepository
    ) {}

    // Get all movies
    public async GetAllMovies(): Promise<Movie[]> {
        return await this.movieRepository.GetAllMovies();
    }

    // Get movie by name
    public async GetMovie(name:string): Promise< Movie[]| null >{
        if(name != null){
            return await this.movieRepository.GetMovie(name);
        } else {
            throw new ApplicationException("Please insert a name")
        }
    }

    // Create movie 
    public async PostMovie(entry: MovieCreateDto ): Promise<void>{
        if(entry.Name){
            await this.movieRepository.PostMovie(entry as Movie);
        } else {
            throw new ApplicationException("Error Insert Movie")
        }
    }

    // Update movie
    public async UpdateMovie(entry: MovieUpdateDto ): Promise<void>{
        if(await this.movieRepository.GetMovieID(entry.ID)){
            await this.movieRepository.UpdateMovie(entry as Movie)
        } else {
            throw new ApplicationException("Error Update Movie")
        }
        
    }

    // Get movie by gender
    public async GetMovieGender(gender:string): Promise< Movie[]| null >{
        if(gender != null){
            return await this.movieRepository.GetMovieGender(gender);
        } else {
            throw new ApplicationException("Please send a gender");
        }
    }
}