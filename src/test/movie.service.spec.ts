import { MovieMockRepository } from './../services/repositories/impl/mock/movie.repository';
import { MovieService } from './../services/movie.service';
import assert = require('assert');
import { MovieCreateDto, MovieUpdateDto } from '../dtos/movie.dto';

const movieService = new MovieService(
    new MovieMockRepository()
);

// Unit test of Movie Service
describe('Movie Service', () => {

    // Get movies
    describe('Get method of movie', () => {
        it('Get all movies', async () => {
            await movieService.GetAllMovies();
        })

        it('Get specific movie', async () => {
            await movieService.GetMovie("Walle");
        })

        it('Get movie that is not in the DB', async () => {
            await movieService.GetMovie("XMEN");
        })
        it('Get movie without name', async () => {
            try{
                await movieService.GetMovie("");
            } catch (error) {
                assert.equal(error.message, 'Please insert a name')
            }
        })
        it('Get comments by gender', async () => {
            await movieService.GetMovieGender("Action");
        })
        it('Get comments by gender without param', async () => {
            try{
                await movieService.GetMovie("");
            } catch (error) {
                assert.equal(error.message, 'Please send a gender')
            }
        })
    })

    // Create new movie
    describe('Create method of movies', () =>{
        it('Create movie with all params', async () => {
            await movieService.PostMovie({
                Name: "MovieTest",
                Director: "DirectorTest",
                Year: 2020,
                Gender: "Action",
                Language: "Spanish",
                Favorite: true,
                Community_Score: 0,
                IMDB: 8,
                Style: "Heroes",
                MetaScore: 8,
                Popularity: 0,
                Image: "ImageTest"
            } as MovieCreateDto)
        })

        it('Create movie params with insufficient params', async () => {
            try{
                await movieService.PostMovie({} as MovieCreateDto)
            } catch (error){
                assert.equal(error.message, 'Error Insert Movie')
            }
        })
    });

    // Update movie
    describe('Update method of movies', () =>{
        it('Update movie with all params', async () => {
            await movieService.UpdateMovie({
                ID: 1,
                Name: "MovieTest",
                Director: "DirectorTest",
                Year: 2020,
                Gender: "Action",
                Language: "Spanish",
                Favorite: true,
                IMDB: 8,
                Style: "Heroes",
                MetaScore: 8,
                Image: "ImageTest"
            } as MovieUpdateDto)
        })

        it('Update movie that does not exist', async () => {
            try{
                await movieService.UpdateMovie({
                    ID: 99,
                    Name: "MovieTest",
                    Director: "DirectorTest",
                    Year: 2020,
                    Gender: "Action",
                    Language: "Spanish",
                    Favorite: true,
                    IMDB: 8,
                    Style: "Heroes",
                    MetaScore: 8,
                    Image: "ImageTest"
                    } as MovieUpdateDto)
            } catch (error){
                assert.equal(error.message, 'Error Update Movie')
            }
        })

        it('Update movie without id', async () => {
            try{
                await movieService.UpdateMovie({
                    Name: "MovieTest",
                    Director: "DirectorTest",
                    Year: 2020,
                    Gender: "Action",
                    Language: "Spanish",
                    Favorite: true,
                    IMDB: 8,
                    Style: "Heroes",
                    MetaScore: 8,
                    Image: "ImageTest"
                    } as MovieUpdateDto)
            } catch (error){
                assert.equal(error.message, 'Error Update Movie')
            }
        })
    });
})