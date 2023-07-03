import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel.component';
import { HotelRoutes } from './hotel.routing';
import { HotelClientService } from 'src/app/services/hotelClient.service';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutes
  ],
  declarations: [HotelComponent],
  providers: [HotelClientService]
})
export class HotelModule { }
