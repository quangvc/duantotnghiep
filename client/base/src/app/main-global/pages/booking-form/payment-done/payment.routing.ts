import { Routes, RouterModule } from '@angular/router';
import { PaymentDoneComponent } from './payment-done.component';

const routes: Routes = [
  { path: '', component: PaymentDoneComponent },
];

export const PaymentDoneRoutes = RouterModule.forChild(routes);
