import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, Subject } from "rxjs";
import { Search } from "../models/search";

@Injectable()
export class searchService{

    onNewResult = new Subject<string[]>()


    constructor(private http: HttpClient){

    }

    search(search: Search): Promise<string[]>{

        //Construct the query params
        const params = new HttpParams().set('api_key', search.api)
                                    .set('q', search.search)
                                    .set('limit', search.results)
                                    .set('offset', 0)
                                    .set('rating', search.rating)
                                    .set('lang', "en")
        
        return firstValueFrom(
        this.http.get<any>('https://api.giphy.com/v1/gifs/search', {params})
            .pipe(
                map(result => {
                    const data = result.data
                    return data.map((v: any) => v.images.downsized_still.url as string)
                        //gives an array of string 
                })
            )
        )

        

    }
}

