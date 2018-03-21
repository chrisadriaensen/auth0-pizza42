import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
