import { Routes, RouterModule } from '@angular/router';
import { FilterPaymentComponent } from './filter-payment.component';

const routes: Routes = [
  { path: '', component: FilterPaymentComponent },
];

export const FilterPaymentRoutes = RouterModule.forChild(routes);
