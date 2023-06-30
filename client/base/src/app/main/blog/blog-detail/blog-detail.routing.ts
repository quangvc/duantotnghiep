import { Routes, RouterModule } from '@angular/router';
import { BlogDetailComponent } from './blog-detail.component';



const routes: Routes = [
  { path: '', component: BlogDetailComponent },
];

export const BlogDetailRoutes = RouterModule.forChild(routes);
