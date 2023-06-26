import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/main/home/home.component';
import { CouponsComponent } from './view/coupons.component';

const routes: Routes = [
  { path: "", component: CouponsComponent },
];

export const CouponsRoutes = RouterModule.forChild(routes);

