import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent implements OnInit {
  genre: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genreName: string },
    private fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
    this.getGenreDetails(this.data.genreName);
  }

  getGenreDetails(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe((res: any) => {
      this.genre = res;
    }, err => {
      console.error(err);
    });
  }
}

