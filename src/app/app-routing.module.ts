import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component'; // Import your welcome component

/**
 * Defines the routes for the application.
 */
const routes: Routes = [
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'welcome', component: WelcomePageComponent }, // Add this line for the welcome page
  { path: 'edit-profile', component: EditProfileComponent },
];

/**
 * The module responsible for handling application routing.
 * 
 * @module
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

