import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Component to display movie details in a dialog.
 */
@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.scss']
})
export class MovieDetailsDialogComponent implements OnInit {
  /**
   * Holds the details of the movie to be displayed.
   */
  movieDetails: any;

  /**
   * Creates an instance of MovieDetailsDialogComponent.
   * @param data - Data passed to the dialog, including the movie title.
   * @param fetchApiData - Service to fetch movie data from the API.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fetchApiData: FetchApiDataService
  ) { }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Calls getMovieDetails to fetch the details of the movie.
   */
  ngOnInit(): void {
    this.getMovieDetails(this.data.title);
  }

  /**
   * Fetches the details of a movie based on the title.
   * @param title - The title of the movie to fetch details for.
   */
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
