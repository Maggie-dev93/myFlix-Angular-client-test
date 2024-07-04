// user-profile-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
})
export class UserProfileDialogComponent {
  user: any;
  favoriteMovies: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data.user;
    this.favoriteMovies = data.favoriteMovies;
  }
}
