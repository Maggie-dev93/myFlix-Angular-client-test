// src/app/edit-profile/edit-profile.component.ts
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
    this.getUser();
  }

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

  onSubmit(): void {
    if (this.noChangesMade()) {
      this.snackBar.open('You must fill out at least one field to update your profile', 'OK', {
        duration: 2000,
      });
      return;
    }

    const username = this.user.Username; // Assuming the username is not being changed
    this.fetchApiData.editUser(username, this.user).subscribe((res: any) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 2000,
      });
      this.router.navigate(['/profile']);
    }, (error: any) => {
      console.error('Error updating profile:', error);
      this.snackBar.open('Failed to update profile', 'OK', {
        duration: 2000,
      });
    });
  }

  noChangesMade(): boolean {
    return this.user.Username === this.originalUser.Username &&
           this.user.Email === this.originalUser.Email &&
           this.user.BirthDate === this.originalUser.BirthDate;
  }
}

