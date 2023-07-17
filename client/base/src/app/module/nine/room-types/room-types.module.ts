import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTypesComponent } from './view/room-types.component';
import { RoomTypesRoutes } from './room-types.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { CreateUpdateRoomTypeComponent } from './create-update-room-type/create-update-room-type.component';
import { QMenuModule } from '../../_mShared/q-menu/q-menu.module';
import { QImageModule } from '../../_mShared/q-image/q-image.module';
import { RoomTypeImgComponent } from './room-type-img/room-type-img.component';

@NgModule({
  imports: [
    SharedModule,
    QMenuModule,
    QImageModule,
    RoomTypesRoutes,
  ],
  exports: [
    RoomTypesComponent
  ],
  declarations: [RoomTypesComponent, CreateUpdateRoomTypeComponent, RoomTypeImgComponent]
})
export class RoomTypesModule { }
