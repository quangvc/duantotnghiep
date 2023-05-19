import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './view/user.component';
import { AuthGuard } from 'src/app/auth/_aShared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [AuthGuard] },
];

export const UserRoutes = RouterModule.forChild(routes);
