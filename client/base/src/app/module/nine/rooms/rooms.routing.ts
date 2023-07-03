import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './view/rooms.component';

const routes: Routes = [
  { path: "", component: RoomsComponent },
];

export const RoomsRoutes = RouterModule.forChild(routes);
