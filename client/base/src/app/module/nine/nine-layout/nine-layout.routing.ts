import { Routes, RouterModule } from '@angular/router';
import { NineLayoutComponent } from './view/nine-layout.component';
import { AuthGuard } from 'src/app/auth/_aShared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: NineLayoutComponent, canActivate: [AuthGuard] },
];

export const NineLayoutRoutes = RouterModule.forChild(routes);
