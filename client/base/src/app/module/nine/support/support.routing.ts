import { SupportComponent } from './support.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: SupportComponent },
];

export const SupportRoutes = RouterModule.forChild(routes);
