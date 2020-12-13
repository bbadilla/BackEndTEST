export interface MovieGetDto{
    ID: number;
    Name: string;
    Director: string;
    Year: number;
    Gender: string;
    Language: string;
    Favorite: boolean;
    Community_Score: number;
    IMDB: number;
    Style: string;
    MetaScore: number;
    Popularity: number;
    Image: string;
    Avarage:number;
}
export interface MovieCreateDto{
    Name: string;
    Director: string;
    Year: number;
    Gender: string;
    Language: string;
    Favorite: boolean;
    Community_Score: number;
    IMDB: number;
    Style: string;
    MetaScore: number;
    Popularity: number;
    Image: string;
}


export interface MovieUpdateDto{
    ID: number;
    Name: string;
    Director: string;
    Year: number;
    Gender: string;
    Language: string;
    Favorite: boolean;
    IMDB: number;
    Style: string;
    MetaScore: number;
    Image: string;
}