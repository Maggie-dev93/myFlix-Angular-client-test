// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { Router } from '@angular/router';

/**
 * Component for displaying and managing the user profile.
 *
 * @component
 * @selector app-user-profile
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /**
   * The current user's data.
   */
  user: any = {};

  /**
   * The list of favorite movies for the current user.
   */
  favoriteMovies: any[] = [];

  /**
   * A copy of the original user data.
   */
  originalUser: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   * Fetches user data on component initialization.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches the current user data from local storage and sets it to the `user` property.
   */
  getUser(): void {
    const curUser = localStorage.getItem('currentUser');
    if (curUser) {
      this.user = JSON.parse(curUser);
      this.originalUser = { ...this.user }; 
      this.favoriteMovies = this.favoriteMovies;
    } else {
      console.error('Username not found in localStorage');
    }
  }

  /**
   * Opens a dialog to display and edit user details.
   */
  openUserDetailsDialog(): void {
    const dialogRef = this.dialog.open(UserProfileDialogComponent, {
      width: '500px',
      data: { 
        user: this.user, 
        favoriteMovies: this.favoriteMovies 
      }
    });
  }

  /**
   * Logs out the user by clearing the user data from local storage and navigating to the welcome page.
   */
  logout(): void {
    // Clear currentUser from localStorage
    localStorage.removeItem('currentUser');
    // Navigate to welcome page
    this.router.navigate(['/welcome']);
  }
}
