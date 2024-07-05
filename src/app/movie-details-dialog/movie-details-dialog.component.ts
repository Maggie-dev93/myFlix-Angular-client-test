import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.scss']
})
export class MovieDetailsDialogComponent implements OnInit {
  movieDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
    this.getMovieDetails(this.data.title);
  }

  getMovieDetails(title: string): void {
    this.fetchApiData.getOneMovie(title).subscribe(
      (res: any) => {
        this.movieDetails = res;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
