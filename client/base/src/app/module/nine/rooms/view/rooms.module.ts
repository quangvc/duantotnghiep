import { NgModule } from '@angular/core';
import { RoomsComponent } from './rooms.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { CreateUpdateRoomComponent } from '../create-update-room/create-update-room.component';
import { QMenuModule } from '../../../_mShared/q-menu/q-menu.module';

@NgModule({
  imports: [
    SharedModule,
    QMenuModule,
  ],
  exports: [RoomsComponent],
  declarations: [RoomsComponent, CreateUpdateRoomComponent]
})
export class RoomsModule { }
