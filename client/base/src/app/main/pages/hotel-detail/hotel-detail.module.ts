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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RoomTypeDetailComponent } from './hotel-booking-room/room-type-detail/room-type-detail.component';
import { CalendarModule } from 'primeng/calendar';
import { HotelBookingRoomModule } from './hotel-booking-room/hotel-booking-room.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    GalleriaModule,
    ScrollPanelModule,
    CheckboxModule,
    DropdownModule,
    HotelDetailRoutes,
    DynamicDialogModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    HotelBookingRoomModule,
    TableModule,
    RatingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HotelDetailComponent,
    HotelBookingRoomComponent,
    HotelDetailAmenitiesComponent,
    HotelPolicyComponent,
    RoomTypeDetailComponent
  ],
  exports: [
    HotelDetailComponent,
    HotelBookingRoomComponent,
    HotelDetailAmenitiesComponent,
    HotelPolicyComponent,
    RoomTypeDetailComponent
  ]

})
export class HotelDetailModule {}
