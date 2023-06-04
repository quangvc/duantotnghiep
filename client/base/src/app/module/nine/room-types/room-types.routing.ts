import { Routes, RouterModule } from '@angular/router';
import { RoomTypesComponent } from './view/room-types.component';

const routes: Routes = [
  { path: "", component: RoomTypesComponent },
];

export const RoomTypesRoutes = RouterModule.forChild(routes);
