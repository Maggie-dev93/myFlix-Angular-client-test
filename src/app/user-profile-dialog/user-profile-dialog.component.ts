import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.scss']
})
export class UserProfileDialogComponent implements OnInit {
  favoriteMovies: any[] = [];
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: any }, 
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {
    this.user = data.user; 
  }

  ngOnInit(): void {
    this.getFavoriteMovies(this.user.Username); 
  }

  getFavoriteMovies(username: string): void {
    this.fetchApiData.getFavoriteMovies(username).subscribe(
      (res: any) => {
        console.log(res);
        this.favoriteMovies = res;
      },
      (err: any) => {
        console.error('Error fetching favorite movies:', err);
      }
    );
  }

  removeFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovies(this.user.Username, movieId).subscribe(
      (res: any) => {
        this.snackBar.open('Removed from favorites', 'OK', {
          duration: 2000,
        });
        // Remove the movie from the local favoriteMovies array
        this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);
        // Update the user object in local storage
        this.user.FavoriteMovies = this.favoriteMovies.map(movie => movie._id);
        localStorage.setItem('currentUser', JSON.stringify(this.user));
      },
      (err: any) => {
        console.error('Error removing from favorites:', err);
        this.snackBar.open('Failed to remove from favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
