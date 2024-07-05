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
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public favoriteButtonComponent: FavoriteButtonComponent
) { }
ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe(res => {
      this.movies = res;

      let user = JSON.parse(localStorage.getItem("currentUser") || "");
      this.movies.forEach((movie: any) => {
        if(user.FavoriteMovies.includes(movie._id)) {
          movie.isFavorite = true;
        }
        else {
          movie.isFavorite = false
        }

      })
      return this.movies;
  }, err => {
      console.error(err)
  })
}

openGenreDialog(genreName: string): void {
  this.dialog.open(GenreDialogComponent, {
    width: '280px',
    data: { genreName }
  });
}

openDirectorDialog(directorName: string): void {
  const dialogRef = this.dialog.open(DirectorDialogComponent, {
    width: '500px',
    data: { directorName: directorName } 
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
openMovieDetailsDialog(title: string): void {
  const dialogRef = this.dialog.open(MovieDetailsDialogComponent, {
    width: '500px',
    data: { title: title } 
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
toggleFavoriteById(movieId: string, isFavorite: boolean): void {
  const favoriteButtonComponent = new FavoriteButtonComponent(this.fetchApiData, this.snackBar);
  favoriteButtonComponent.toggleFavorite(movieId, isFavorite);
}
}