import { Movie } from "./domain/movie";

export interface MovieRepository{
    // methods
    GetAllMovies(): Promise<Movie[]>;
    GetMovie(name:string): Promise<Movie[] | null>
    GetMovieID(id: number): Promise<Movie[] | null>
    PostMovie(entry: Movie ): Promise<void>
    UpdateMovie(entry: Movie): Promise<void>
    GetMovieGender(gender: string): Promise<Movie[] | null>
}