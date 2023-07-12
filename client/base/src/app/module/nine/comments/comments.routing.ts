import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments.component';

const routes: Routes = [
  { path: '', component: CommentsComponent },
];

export const CommentsRoutes = RouterModule.forChild(routes);
