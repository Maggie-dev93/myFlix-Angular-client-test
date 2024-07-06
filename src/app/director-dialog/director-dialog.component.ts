/**
 * Component for displaying details of a director in a dialog.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent implements OnInit {
  director: any; // Holds director details retrieved from the API.

  /**
   * Constructor of DirectorDialogComponent.
   * @param data Data injected into the dialog, containing directorName.
   * @param fetchApiData Service for fetching director details from the API.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fetchApiData: FetchApiDataService
  ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Retrieves director details using the provided directorName.
   */
  ngOnInit(): void {
    this.getDirectorDetails(this.data.directorName);
  }

  /**
   * Fetches director details from the API based on the given directorName.
   * @param directorName The name of the director to fetch details for.
   */
  getDirectorDetails(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe(
      (res: any) => {
        this.director = res; // Assigns retrieved director details to the component property.
      },
      (err: any) => {
        console.error('Error fetching director details:', err); // Logs any errors that occur during API request.
      }
    );
  }
}
