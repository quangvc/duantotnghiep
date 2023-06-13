import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './view/hotels.component';
import { HotelsRoutes } from './hotels.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { AddHotelComponent } from './create-update-hotel/create-update-hotel.component';
import { RegionsService } from '../../_mShared/service/regions.service';
import { QMenuModule } from '../../_mShared/q-menu/q-menu.module';

@NgModule({
  imports: [
    SharedModule,
    QMenuModule,
    HotelsRoutes
  ],
  declarations: [HotelsComponent, AddHotelComponent],
  providers: [RegionsService]
})
export class HotelsModule { }
