import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * User login form component.
 * 
 * @component
 * @selector app-user-login-form
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Input property to hold user login data.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Constructor for the UserLoginFormComponent.
   * 
   * @param fetchApiData - Service to fetch API data.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Service to show snack bar messages.
   * @param router - Router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
    console.log('UserLoginFormComponent initialized');
  }

  /**
   * Function to log in the user.
   */
  loginUser(): void {
    console.log('Login attempt with userData:', this.userData);

    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        console.log('Login successful, result:', result);

        this.dialogRef.close();
        this.snackBar.open('User Login successful', 'OK', {
          duration: 2000,
        });

        localStorage.setItem('currentUser', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);

        console.log('Current user set in localStorage:', JSON.stringify(result.user));
        console.log('Token set in localStorage:', result.token);

        this.router.navigate(['movies']);
      },
      (error) => {
        console.error('Login failed, error:', error);
        console.log('Error response body:', error.error);

        this.snackBar.open('Login failed:', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
