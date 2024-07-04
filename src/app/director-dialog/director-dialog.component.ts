import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent implements OnInit {
  director: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
    this.getDirectorDetails(this.data.directorName);
  }

  getDirectorDetails(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((res: any) => {
      this.director = res;
    }, err => {
      console.error(err);
    });
  }
}
