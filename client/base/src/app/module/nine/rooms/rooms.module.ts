import { NgModule } from '@angular/core';
import { RoomsComponent } from './view/rooms.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { RoomsRoutes } from './rooms.routing';
import { CreateUpdateRoomComponent } from './create-update-room/create-update-room.component';

@NgModule({
  imports: [
    SharedModule,
    RoomsRoutes
  ],
  declarations: [RoomsComponent, CreateUpdateRoomComponent]
})
export class RoomsModule { }
