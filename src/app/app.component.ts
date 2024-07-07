// src/app/app.component.ts

import { Component } from '@angular/core';

/**
 * The main app component.
 * 
 * @component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * The title of the application.
   */
  title = 'myFlix-Angular-client';
}
