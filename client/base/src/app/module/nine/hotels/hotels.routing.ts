import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/main/home/home.component';
import { HotelsComponent } from './view/hotels.component';

const routes: Routes = [
  { path: "", component: HotelsComponent },
];

export const HotelsRoutes = RouterModule.forChild(routes);
