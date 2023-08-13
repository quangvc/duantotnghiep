import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking.component';

const routes: Routes = [
  { path: '', component: BookingComponent },
];

export const BookingRoutes = RouterModule.forChild(routes);
