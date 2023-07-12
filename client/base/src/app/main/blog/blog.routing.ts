import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';


const routes: Routes = [
  { path: '', component: BlogComponent },
];

export const BlogRoutes = RouterModule.forChild(routes);
