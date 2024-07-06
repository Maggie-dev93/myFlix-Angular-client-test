import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

/**
 * Component for the favorite button functionality.
 * Allows users to add or remove movies from their favorites.
 *
 * @component
 * @selector app-favorite-button
 */
@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class FavoriteButtonComponent {
  /**
   * Input property to receive movie ID.
   */
  @Input() movieId!: string;

  /**
   * Input property to determine if the movie is already a favorite.
   */
  @Input() isFavorite!: boolean;

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Toggles the favorite status of a movie.
   *
   * @param movieId - The ID of the movie to toggle favorite status for.
   * @param isFavorite - The current favorite status of the movie.
   */
  toggleFavorite(movieId: string, isFavorite: boolean): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const username = user.Username;
    const icon = document.getElementById(`${movieId}-favorite-icon`);

    console.log('Before toggle favorite, user:', user);

    if (isFavorite) {
      this.fetchApiData.deleteFavoriteMovies(username, movieId).subscribe((res) => {
        console.log('Delete response:', res); // Log the response
        this.snackBar.open('Removed from favorites', 'OK', {
          duration: 2000,
        });
        this.isFavorite = false;
        icon?.setAttribute("fontIcon", "favorite_border");

        // Manually update the local user object to reflect the changes
        user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movieId);
        console.log('User after removing favorite movie:', user);
        this.updateUserFavorites(user);
      }, (error) => {
        console.error('Error removing from favorites:', error);
        this.snackBar.open('Failed to remove from favorites', 'OK', {
          duration: 2000,
        });
      });
    } else {
      this.fetchApiData.addFavoriteMovies(username, movieId).subscribe((res) => {
        console.log('Add response:', res); // Log the response
        this.snackBar.open('Added to favorites', 'OK', {
          duration: 2000,
        });
        this.isFavorite = true;
        icon?.setAttribute("fontIcon", "favorite");

        user.FavoriteMovies.push(movieId);
        console.log('User after adding favorite movie:', user);
        this.updateUserFavorites(user);
      }, (error) => {
        console.error('Error adding to favorites:', error);
        this.snackBar.open('Failed to add to favorites', 'OK', {
          duration: 2000,
        });
      });
    }
  }

  /**
   * Updates the user object in local storage with the new favorite movies.
   *
   * @param user - The updated user object.
   */
  private updateUserFavorites(user: any): void {
    console.log('Before updating localStorage, user:', user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('After updating localStorage, currentUser:', localStorage.getItem('currentUser'));
  }
}
