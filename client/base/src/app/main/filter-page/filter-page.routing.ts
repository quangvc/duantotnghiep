import { Routes, RouterModule } from '@angular/router';
import { FilterPageComponent } from './filter-page.component';

const routes: Routes = [
  { path: '', component: FilterPageComponent },
];

export const FilterPageRoutes = RouterModule.forChild(routes);
