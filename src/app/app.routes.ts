import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DateCardComponent } from './date-card/date-card.component';

export const routes: Routes = [
  { path: '', component: DateCardComponent },
  { path: 'about', component: AboutComponent },
  { path: '*', redirectTo: '/', pathMatch: 'full' },
];
