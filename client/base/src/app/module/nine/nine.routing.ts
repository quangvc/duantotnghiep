import { Routes, RouterModule } from '@angular/router';
import { NineLayoutComponent } from './nine-layout/view/nine-layout.component';

const routes: Routes = [
  { path: '', redirectTo: "nine", pathMatch: "full" },
  {path: 'nine', component: NineLayoutComponent, children: [
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)}
  ]}
];

export const NineRoutes = RouterModule.forRoot(routes);
