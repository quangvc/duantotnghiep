import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel.component';
import { HotelRoutes } from './hotel.routing';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { HotelClientService } from '../../services/hotelClient.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { LineClampComponent } from '../../share/line-clamp/line-clamp.component';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutes
  ],
  declarations: [
    HotelComponent,
  ],
  providers: [HotelClientService, HotelsService, RegionsClientService,],
})
export class HotelModule { }
