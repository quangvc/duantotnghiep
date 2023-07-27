import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NineBookingsComponent } from './nine-bookings.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { NineBookingsRoutes } from './nine-bookings.routing';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { XepPhongComponent } from './xep-phong/xep-phong.component';

@NgModule({
  imports: [
    SharedModule,
    NzTabsModule,
    NzTagModule,
    NineBookingsRoutes
  ],
  declarations: [NineBookingsComponent, BookingFormComponent,CreateBookingComponent,XepPhongComponent]
})
export class NineBookingsModule { }
