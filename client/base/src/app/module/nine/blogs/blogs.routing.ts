import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/main/home/home.component';
import { BlogsComponent } from './view/blogs.component';

const routes: Routes = [
  { path: "", component: BlogsComponent },
];

export const BlogsRoutes = RouterModule.forChild(routes);

