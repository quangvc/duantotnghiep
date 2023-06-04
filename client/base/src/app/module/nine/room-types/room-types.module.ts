import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypesComponent } from './view/room-types.component';
import { RoomTypesRoutes } from './room-types.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { CreateUpdateRoomTypeComponent } from './create-update-room-type/create-update-room-type.component';

@NgModule({
  imports: [
    SharedModule,
    RoomTypesRoutes
  ],
  declarations: [RoomTypesComponent, CreateUpdateRoomTypeComponent]
})
export class RoomTypesModule { }
