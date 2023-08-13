import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '' , loadChildren: () => import('./main-global/main-global.module').then(m => m.MainGlobalModule)},
];

export const AppRoutes = RouterModule.forRoot(routes);
