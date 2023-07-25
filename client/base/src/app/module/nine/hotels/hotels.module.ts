import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './view/hotels.component';
import { HotelsRoutes } from './hotels.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { AddHotelComponent } from './create-update-hotel/create-update-hotel.component';
import { RegionsService } from '../../_mShared/service/regions.service';
import { QMenuModule } from '../../_mShared/q-menu/q-menu.module';
import { ImageComponent } from './image/image.component';
import { QImageModule } from '../../_mShared/q-image/q-image.module';
import { DetailHotelComponent } from './detail-hotel/detail-hotel.component';
import { RoomTypesModule } from '../room-types/room-types.module';

@NgModule({
  imports: [
    SharedModule,
    QMenuModule,
    QImageModule,
    HotelsRoutes,
    RoomTypesModule
  ],
  declarations: [HotelsComponent, AddHotelComponent, ImageComponent, DetailHotelComponent],
  providers: [RegionsService]
})
export class HotelsModule { }
