import { Routes, RouterModule } from '@angular/router';
import { BannersComponent } from './banners.component';

const routes: Routes = [
  { path: '', component: BannersComponent },
];

export const BannersRoutes = RouterModule.forChild(routes);
