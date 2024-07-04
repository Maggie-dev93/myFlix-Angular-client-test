// src/app/user-profile-dialog/user-profile-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.scss']
})
export class UserProfileDialogComponent implements OnInit {
  favoriteMovies: any[] = [];
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: any }, // Adjusted to receive user data
    private fetchApiData: FetchApiDataService
  ) {
    this.user = data.user; // Assign user data
  }

  ngOnInit(): void {
    this.fetchFavoriteMovies(this.user.Username); // Fetch favorite movies using user's username
  }

  fetchFavoriteMovies(username: string): void {
    this.fetchApiData.getFavoriteMovies(username).subscribe(
      (res: any) => {
        this.favoriteMovies = res;
      },
      (err: any) => {
        console.error('Error fetching favorite movies:', err);
      }
    );
  }
}

