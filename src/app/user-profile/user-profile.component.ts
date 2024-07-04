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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser(username).subscribe((resp: any) => {
        this.user = resp;
        this.favoriteMovies = this.user.FavoriteMovies;
        this.router.navigate(['users']);
        console.log(this.user);
      });
    } else {
      console.error('Username not found in localStorage');
    }
  }

  openUserDetailsDialog(): void {
    this.dialog.open(UserProfileDialogComponent, {
      width: '500px',
      data: { user: this.user }
    });
  }
}
