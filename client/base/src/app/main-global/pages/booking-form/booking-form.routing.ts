import { Routes, RouterModule } from '@angular/router';
import { BookingFormComponent } from './booking-form.component';

const routes: Routes = [
  { path: '', component: BookingFormComponent, children: [
    { path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule)},
    { path: 'bookingform', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule)},
    { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)},
    { path: 'payment-done', loadChildren: () => import('./payment-done/payment-done.module').then(m => m.PaymentDoneModule)}
  ]},
];

export const BookingFormRoutes = RouterModule.forChild(routes);
