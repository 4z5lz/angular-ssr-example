import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class DataService {
  private usersEndpointUrl = 'https://jsonplaceholder.typicode.com/users'; // URL to web api
  private postsEndpointUrl = 'https://jsonplaceholder.typicode.com/posts'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET top 10 users list */
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersEndpointUrl)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])));
  }

  /** GET top 100 posts list */
  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.postsEndpointUrl)
      .pipe(catchError(this.handleError<Post[]>('getPosts', [])));
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
