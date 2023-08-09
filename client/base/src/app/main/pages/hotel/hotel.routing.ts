import { Routes, RouterModule } from '@angular/router';
import { HotelComponent } from './hotel.component';

const routes: Routes = [
  { path: '', component: HotelComponent },
];

export const HotelRoutes = RouterModule.forChild(routes);
