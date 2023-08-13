import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback.component';

const routes: Routes = [
  { path: '', component: FeedbackComponent },
];

export const FeedbackRoutes = RouterModule.forChild(routes);
