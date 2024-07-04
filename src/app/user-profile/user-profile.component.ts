import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(
    private dialog: MatDialog,
    private fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.getUserProfile(); // Implement this method to fetch user details and favorite movies
  }

  openUserProfileDialog(): void {
    this.dialog.open(UserProfileDialogComponent, {
      width: '500px',
      data: { user: this.user }
    });
  }

  private getUserProfile(): void {
    // Implement your logic to fetch user profile and favorite movies
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser(username).subscribe(
        (response: any) => {
          this.user = response.user;
        },
        (error: any) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('Username not found in localStorage');
    }
  }
}
