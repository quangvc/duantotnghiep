import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './team.component';

const routes: Routes = [
  { path: '', component: TeamComponent },
];

export const TeamRoutes = RouterModule.forChild(routes);
