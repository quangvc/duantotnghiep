import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './view/hotels.component';
import { HotelsRoutes } from './hotels.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { AddHotelComponent } from './create-update-hotel/create-update-hotel.component';

@NgModule({
  imports: [
    SharedModule,
    HotelsRoutes
  ],
  declarations: [HotelsComponent, AddHotelComponent]
})
export class HotelsModule { }
