import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
  { path: '', component: PaymentComponent },
];

export const PaymentRoutes = RouterModule.forChild(routes);
