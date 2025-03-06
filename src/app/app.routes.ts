import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DateCardComponent } from './date-card/date-card.component';

export const routes: Routes = [
  { path: 'date', component: DateCardComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/date', pathMatch: 'full' },
  { path: '*', redirectTo: '/date', pathMatch: 'full' },
];
