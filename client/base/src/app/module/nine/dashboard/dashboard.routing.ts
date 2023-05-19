import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './view/dashboard.component';
import { AuthGuard } from 'src/app/auth/_aShared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
];

export const DashboardRoutes = RouterModule.forChild(routes);
