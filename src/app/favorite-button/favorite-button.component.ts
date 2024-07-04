import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent {
  @Input()
  movieId!: string; // Input property to receive movie ID
  @Input()
  isFavorite!: boolean; // Input property to determine if the movie is already a favorite

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  }

  addToFavorites(): void {
    const username = localStorage.getItem('user');
    if (!username) {
      console.error('Username not found in localStorage');
      return;
    }

    this.fetchApiData.addFavoriteMovies(username, this.movieId).subscribe(
      (response: any) => {
        this.snackBar.open('Added to favorites', 'OK', {
          duration: 2000,
        });
        // Update local state or trigger event to update parent component
      },
      (error: any) => {
        console.error('Error adding to favorites:', error);
        this.snackBar.open('Failed to add to favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  removeFromFavorites(): void {
    const username = localStorage.getItem('user');
    if (!username) {
      console.error('Username not found in localStorage');
      return;
    }

    /*this.fetchApiData.removeFavoriteMovies(username, this.movieId).subscribe(
      (response: any) => {
        this.snackBar.open('Removed from favorites', 'OK', {
          duration: 2000,
        });
        // Update local state or trigger event to update parent component
      },
      (error: any) => {
        console.error('Error removing from favorites:', error);
        this.snackBar.open('Failed to remove from favorites', 'OK', {
          duration: 2000,
        });
      }
    );*/
  }
}
