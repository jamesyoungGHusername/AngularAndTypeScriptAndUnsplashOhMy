import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  constructor(
    private http: HttpClient
  ) { 
    
  }
  /**
   * Returns the URL for a single random image.
   * @param searchTerm natural language search term, optional
   * @param x x size in pixels, default 500
   * @param y y size in pixels, default 500
   */
  getRandomPhoto(searchTerm?:string,x?:number,y?:number):Observable<string>{
    let xPix = (x) ? x : 500
    let yPix = (y) ? y : 500
    //parses url to include x and y dimensions as well as the search term if there is one.
    let apiURL = `https://source.unsplash.com/random/${xPix}x${yPix}/${ searchTerm ? `?${searchTerm}` : ''}`

    return this.http.get<string>(apiURL)
    .pipe(
      catchError(e => of(e["url"]))
    );
  }

}
