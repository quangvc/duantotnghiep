import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel.component';
import { HotelRoutes } from './hotel.routing';
import { HotelClientService } from 'src/app/services/hotelClient.service';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutes
  ],
  declarations: [HotelComponent],
  providers: [HotelClientService, HotelsService],
})
export class HotelModule { }
