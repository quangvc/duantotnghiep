import { Routes, RouterModule } from '@angular/router';
import { BookingFormComponent } from './booking-form.component';

const routes: Routes = [
  { path: '', component: BookingFormComponent },
];

export const BookingFormRoutes = RouterModule.forChild(routes);
