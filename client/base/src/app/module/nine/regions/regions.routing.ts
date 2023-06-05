import { Routes, RouterModule } from '@angular/router';
import { RegionsComponent } from './view/regions.component';

const routes: Routes = [
  { path: "", component: RegionsComponent },
];

export const RegionsRoutes = RouterModule.forChild(routes);
