import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailComponent } from './hotel-detail.component';
import { HotelDetailRoutes } from './hotel-detail.routing';

import { GalleriaModule } from 'primeng/galleria';
import { HotelBookingRoomComponent } from './hotel-booking-room/hotel-booking-room.component';
import { HotelDetailAmenitiesComponent } from './hotel-detail-amenities/hotel-detail-amenities.component';
import { HotelPolicyComponent } from './hotel-policy/hotel-policy.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    GalleriaModule,
    ScrollPanelModule,
    CheckboxModule,
    DropdownModule,
    HotelDetailRoutes
  ],
  declarations: [
    HotelDetailComponent,
    HotelBookingRoomComponent,
    HotelDetailAmenitiesComponent,
    HotelPolicyComponent
  ],
})
export class HotelDetailModule {}
