import { ApplicationException } from './../common/exception/application.exception';
import { MovieCreateDto, MovieUpdateDto } from '../dtos/movie.dto';
import { Movie } from './repositories/domain/movie';
import { MovieRepository } from './repositories/movie.repository';
export class MovieService{
    constructor(
        private readonly movieRepository: MovieRepository
    ) {}

    public async GetAllMovies(): Promise<Movie[]> {
        return await this.movieRepository.GetAllMovies();
    }

    public async GetMovie(name:string): Promise< Movie[]| null >{
        if(name != null){
            return await this.movieRepository.GetMovie(name);
        } else {
            throw new ApplicationException("Please insert a name")
        }
    }

    public async PostMovie(entry: MovieCreateDto ): Promise<void>{
        if(entry.Name){
            await this.movieRepository.PostMovie(entry as Movie);
        } else {
            throw new ApplicationException("Error Insert Movie")
        }
    }

    public async UpdateMovie(entry: MovieUpdateDto ): Promise<void>{
        if(await this.movieRepository.GetMovieID(entry.ID)){
            await this.movieRepository.UpdateMovie(entry as Movie)
        } else {
            throw new ApplicationException("Error Update Movie")
        }
        
    }

    public async GetMovieGender(gender:string): Promise< Movie[]| null >{
        if(gender != null){
            return await this.movieRepository.GetMovie(gender);
        } else {
            throw new ApplicationException("Please send a gender");
        }
    }
}