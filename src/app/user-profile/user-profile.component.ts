// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  originalUser: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

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

    openUserDetailsDialog(): void {
      const dialogRef = this.dialog.open(UserProfileDialogComponent, {
        width: '500px',
        data: { 
          user: this.user, 
          favoriteMovies: this.favoriteMovies 
        }
      });
    }
  }    
