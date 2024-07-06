import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [DatePipe]
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  originalUser: any = {};

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getUser(); // Fetch user data on component initialization
  }

  // Function to fetch user data from local storage
  getUser(): void {
    const curUser = localStorage.getItem('currentUser');
    if (curUser) {
      this.user = JSON.parse(curUser);
      this.originalUser = { ...this.user }; // Save a copy of the original user data
      this.user.BirthDate = this.datePipe.transform(this.user.BirthDate, 'yyyy-MM-dd');
    } else {
      console.error('Username not found in localStorage');
    }
  }

  // Function to submit the updated profile
  onSubmit(): void {
    if (this.noChangesMade()) {
      this.snackBar.open('You must fill out at least one field to update your profile', 'OK', {
        duration: 2000,
      });
      return;
    }

    // Ensure the original username is included in the payload
    this.user.Username = this.originalUser.Username;

    // Check if password has changed
    if (this.user.Password && this.user.Password !== this.originalUser.Password) {
      console.log('Password has changed, flagging for hashing');
      this.user.PasswordChanged = true; // Add a flag to indicate the password has changed
    } else {
      console.log('Password has not changed');
      this.user.PasswordChanged = false;
      delete this.user.Password; // Remove the password field if it hasn't changed
    }

    const originalUsername = this.originalUser.Username;

    // Log the payload before making the request
    console.log('Payload:', this.user);

    this.fetchApiData.editUser(originalUsername, this.user).subscribe(
      (res: any) => {
        localStorage.setItem('currentUser', JSON.stringify(res)); // Update local storage with updated user data
        this.snackBar.open('Profile updated successfully', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/profile']); // Redirect to profile page after successful update
      },
      (error: any) => {
        console.error('Error updating profile:', error);
        if (error.status === 400) {
          this.snackBar.open('Invalid request. Please check the input fields.', 'OK', {
            duration: 2000,
          });
        } else if (error.status === 404) {
          this.snackBar.open('User not found. Please try again later.', 'OK', {
            duration: 2000,
          });
        } else {
          this.snackBar.open('Failed to update profile. Please try again later.', 'OK', {
            duration: 2000,
          });
        }
      }
    );
  }

  // Function to check if any changes were made in the profile form
  noChangesMade(): boolean {
    return (
      this.user.Email === this.originalUser.Email &&
      this.user.BirthDate === this.originalUser.BirthDate &&
      (!this.user.Password || this.user.Password === '') // Check if password is empty or unchanged
    );
  }
}
