import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';


const routes: Routes = [
  { path: '', component: SupportComponent },
];

export const SupportRoutes = RouterModule.forChild(routes);
