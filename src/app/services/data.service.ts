import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Show } from '../models/show';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private showsSearchEndpointUrl = 'http://api.tvmaze.com/search/shows?q='; // URL to TV-Maze search web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getShows(query: string): Observable<Show[]> {
    return this.http
      .get<Show[]>(this.showsSearchEndpointUrl + query)
      .pipe(catchError(this.handleError<Show[]>('getShows, query:' + query, [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
