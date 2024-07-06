import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * The WelcomePageComponent is responsible for displaying the welcome page
 * and providing functionality to open user registration and login dialogs.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
   * Constructs a new instance of the WelcomePageComponent.
   * @param dialog - A service for opening modal dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Implement this interface to handle any additional initialization tasks.
   */
  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
