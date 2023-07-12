import { Routes, RouterModule } from '@angular/router';
import { NineBookingsComponent } from './nine-bookings.component';

const routes: Routes = [
  { path: "", component: NineBookingsComponent },
];

export const NineBookingsRoutes = RouterModule.forChild(routes);
