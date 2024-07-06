import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * The GenreDialogComponent is responsible for displaying genre details in a dialog.
 */
@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent implements OnInit {
  /**
   * Holds the genre details fetched from the API.
   */
  genre: any;

  /**
   * @param data - Injected data containing the genre name to fetch details for.
   * @param fetchApiData - Service for making API calls.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genreName: string },
    private fetchApiData: FetchApiDataService
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Fetches genre details based on the provided genre name.
   */
  ngOnInit(): void {
    this.getGenreDetails(this.data.genreName);
  }

  /**
   * Fetches genre details from the API and assigns them to the genre property.
   * @param genreName - The name of the genre to fetch details for.
   */
  getGenreDetails(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe((res: any) => {
      this.genre = res;
    }, err => {
      console.error(err);
    });
  }
}
