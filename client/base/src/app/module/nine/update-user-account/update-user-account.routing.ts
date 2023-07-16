import { Routes, RouterModule } from '@angular/router';
import { UpdateUserAccountComponent } from './update-user-account.component';

const routes: Routes = [
  { path: '', component: UpdateUserAccountComponent },
];

export const UpdateUserAccountRoutes = RouterModule.forChild(routes);
