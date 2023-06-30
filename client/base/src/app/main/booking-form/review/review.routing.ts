import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './review.component';

const routes: Routes = [
  { path: '', component: ReviewComponent },
];

export const ReviewRoutes = RouterModule.forChild(routes);
