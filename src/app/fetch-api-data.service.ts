import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-flixmcn-ed96d6a64be1.herokuapp.com/';

/**
 * Service to handle API calls to the myFlix backend.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * Injects the HttpClient module to the constructor params.
   * This provides HttpClient to the entire class, making it available via this.http.
   * 
   * @param http - Injected HttpClient.
   */
  constructor(private http: HttpClient) { }

  /**
   * Registers a new user.
   * 
   * @param userDetails - Object containing user details for registration.
   * @returns Observable with the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user.
   * 
   * @param userDetails - Object containing user login details.
   * @returns Observable with the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Gets all movies.
   * 
   * @returns Observable with the list of movies.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  /**
   * Gets information about a specific movie.
   * 
   * @param title - Title of the movie.
   * @returns Observable with the movie details.
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  /**
   * Gets information about a director.
   * 
   * @param directorName - Name of the director.
   * @returns Observable with the director details.
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  /**
   * Gets information about a genre.
   * 
   * @param genreName - Name of the genre.
   * @returns Observable with the genre details.
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  /**
   * Gets information about a user.
   * 
   * @param username - Username of the user.
   * @returns Observable with the user details.
   */
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  /**
   * Gets favorite movies of a user.
   * 
   * @param username - Username of the user.
   * @returns Observable with the list of favorite movies.
   */
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username + '/favoriteMovies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to a user's favorite movies.
   * 
   * @param username - Username of the user.
   * @param movieID - ID of the movie to be added.
   * @returns Observable with the API response.
   */
  addFavoriteMovies(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID , {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  /**
   * Edits a user's details.
   * 
   * @param username - Username of the user.
   * @param userDetails - Object containing the updated user details.
   * @returns Observable with the API response.
   */
  editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    }).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user.
   * 
   * @param username - Username of the user.
   * @returns Observable with the API response.
   */
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token not found in localStorage.'));
    }

    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      observe: 'response'
    }).pipe(
      map((res: any) => {
        if (res.status === 200) {
          return res.body;
        } else {
          throw new Error(`Unexpected status code ${res.status}`);
        }
      }),
      catchError((error: any) => {
        console.error('Error in deleteUser:', error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }

  /**
   * Deletes a movie from a user's favorite movies.
   * 
   * @param username - Username of the user.
   * @param movieID - ID of the movie to be removed.
   * @returns Observable with the API response.
   */
  deleteFavoriteMovies(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text' // Expect a text response from the server
    }).pipe(
      map((res: any) => res), // Directly map the response
      catchError(this.handleError)
    );
  }

  /**
   * Extracts the response data from the API response.
   * 
   * @param res - The API response.
   * @returns The response body or an empty object.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles errors from API calls.
   * 
   * @param error - The error response.
   * @returns Observable throwing the error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
