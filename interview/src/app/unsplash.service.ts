import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, Subscription } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { PhotoSearch,Photo } from './photo';

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
  getRandomPhoto(searchTerm?:string | null | undefined,x?:number,y?:number):Observable<string>{
    let xPix = (x) ? x : 500
    let yPix = (y) ? y : 500
    //parses url to include x and y dimensions as well as the search term if there is one.
    //let apiURL = `https://source.unsplash.com/random/${xPix}x${yPix}/${ searchTerm ? `?${searchTerm}` : ''}`
    let apiURL = `https://api.unsplash.com/photos/random?query=${ searchTerm ? `${searchTerm}` : ''}`
    return this.http.get<string>(apiURL)
    .pipe(
      catchError(e => of(e["url"]))
    );
  }

  /**
   * Fetches n number of random photos. allows search term and x,y pixels
   * @param n Number of photos to fetch
   * @param searchTerm what the photos will relate to
   * @returns 
   */
  getRandomPhotos(n:number,searchTerm?:string | undefined):Observable<Photo[]>{
    //parses url to include x and y dimensions as well as the search term if there is one. Rounds specified number to nearest whole number
    let apiURL = `https://api.unsplash.com/photos/random?query=${ searchTerm ? `${searchTerm}` : ''}&count=${n}`
    return this.http.get<Photo[]>(apiURL)
  }

}
