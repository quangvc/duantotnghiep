import { Routes, RouterModule } from '@angular/router';
import { ContractComponent } from './contract.component';

const routes: Routes = [
  { path: '', component: ContractComponent },
];

export const ContractRoutes = RouterModule.forChild(routes);
