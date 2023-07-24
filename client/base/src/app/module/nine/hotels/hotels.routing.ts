import { Routes, RouterModule } from '@angular/router';
import { HotelsComponent } from './view/hotels.component';

const routes: Routes = [
  { path: "", component: HotelsComponent },
];

export const HotelsRoutes = RouterModule.forChild(routes);
