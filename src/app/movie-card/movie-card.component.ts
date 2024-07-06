// src/app/movie-card/movie-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public favoriteButtonComponent: FavoriteButtonComponent
  ) { }

  /**
   * Initializes component by fetching all movies.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches all movies from the API and sets up favorite status for each movie based on user data.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(res => {
      this.movies = res;

      let user = JSON.parse(localStorage.getItem("currentUser") || "");
      this.movies.forEach((movie: any) => {
        if (user.FavoriteMovies.includes(movie._id)) {
          movie.isFavorite = true;
        } else {
          movie.isFavorite = false;
        }
      });
    }, err => {
      console.error(err);
    });
  }

  /**
   * Opens a dialog to display details of a specific genre.
   * @param genreName - The name of the genre to display details for.
   */
  openGenreDialog(genreName: string): void {
    this.dialog.open(GenreDialogComponent, {
      width: '280px',
      data: { genreName }
    });
  }

  /**
   * Opens a dialog to display details of a specific director.
   * @param directorName - The name of the director to display details for.
   */
  openDirectorDialog(directorName: string): void {
    const dialogRef = this.dialog.open(DirectorDialogComponent, {
      width: '500px',
      data: { directorName }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * Opens a dialog to display details of a specific movie.
   * @param title - The title of the movie to display details for.
   */
  openMovieDetailsDialog(title: string): void {
    const dialogRef = this.dialog.open(MovieDetailsDialogComponent, {
      width: '500px',
      data: { title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * Toggles the favorite status of a movie by calling the toggleFavorite method of FavoriteButtonComponent.
   * @param movieId - The ID of the movie to toggle favorite status for.
   * @param isFavorite - The current favorite status of the movie.
   */
  toggleFavoriteById(movieId: string, isFavorite: boolean): void {
    const favoriteButtonComponent = new FavoriteButtonComponent(this.fetchApiData, this.snackBar);
    favoriteButtonComponent.toggleFavorite(movieId, isFavorite);
  }
}
