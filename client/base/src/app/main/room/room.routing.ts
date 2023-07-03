import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room.component';

const routes: Routes = [
  { path: '', component: RoomComponent },
];

export const RoomRoutes = RouterModule.forChild(routes);
