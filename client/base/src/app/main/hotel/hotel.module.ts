import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel.component';
import { HotelRoutes } from './hotel.routing';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutes
  ],
  declarations: [HotelComponent]
})
export class HotelModule { }
