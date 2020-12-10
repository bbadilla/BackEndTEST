import { Movie } from "../../services/repositories/domain/movie";

export function calculate(d1: number, d2:number, d3:number, d4:number, d5:number, result: Movie[] ){
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
    avarage = avarage.slice(0,10);
    
    // result.forEach((element, index) => {
    //     element['Avarage'] = avarage[index];
    // });

}