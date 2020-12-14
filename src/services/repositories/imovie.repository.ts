import { Movie } from "./domain/movie";

// Interface of Movie Repository
export interface IMovieRepository{
    // Methods
    GetAllMovies(): Promise<Movie[]>;
    GetMovie(name:string): Promise<Movie[] | null>
    GetMovieID(id: number): Promise<Movie[] | null>
    PostMovie(entry: Movie ): Promise<void>
    UpdateMovie(entry: Movie): Promise<void>
    GetMovieGender(gender: string): Promise<Movie[] | null>
}