import { Routes, RouterModule } from '@angular/router';
import { HotelDetailComponent } from './hotel-detail.component';

const routes: Routes = [
  { path: '', component: HotelDetailComponent },
];

export const HotelDetailRoutes = RouterModule.forChild(routes);
