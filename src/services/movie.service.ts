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
        return await this.movieRepository.GetMovie(name);
    }

    public async PostMovie(entry: MovieCreateDto ): Promise<void>{
        return await this.movieRepository.PostMovie(entry as Movie);
    }

    public async UpdateMovie(entry: MovieUpdateDto ): Promise<void>{
        return await this.movieRepository.UpdateMovie(entry as Movie);
    }

    public async GetMovieGender(gender:string): Promise< Movie[]| null >{
        return await this.movieRepository.GetMovieGender(gender);
    }
}