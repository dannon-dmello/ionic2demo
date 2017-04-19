import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataProvider {
  baseUrl = "http://www.omdbapi.com/";

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }
    
  getMovies(searchQuery:string): Observable<any>{
      let url = this.baseUrl+"?page=1&s="+encodeURI(searchQuery);
      console.log("URL:"+url);
      return this.http.get(url).map(res=>res.json());
  }

  getMovieDetails(movieId:string): Observable<any>{
      let url = this.baseUrl+"?plot=full&i="+movieId;
      console.log("URL:"+url);
      return this.http.get(url).map(res=>res.json());
  }
}
