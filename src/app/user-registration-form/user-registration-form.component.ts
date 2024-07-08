import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * User registration form component.
 * 
 * @component
 * @selector app-user-registration-form
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Input property to hold user registration data.
   */
  @Input() userData = { Username: '', Password: '', Email: '', BirthDate: '' };

  /**
   * Constructor for the UserRegistrationFormComponent.
   * 
   * @param fetchApiData - Service to fetch API data.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Service to show snack bar messages.
   */
  constructor(
    @Inject(FetchApiDataService) public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void { }

  /**
   * Function to register a new user.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result: any) => {
      this.dialogRef.close();
      this.snackBar.open(result, 'Successful registration. Please log in. OK', {
        duration: 2000
      });
    }, (result: any) => {
      this.snackBar.open(result, 'Username is already taken. Please try another. OK', {
        duration: 2000
      });
    });
  }
}
