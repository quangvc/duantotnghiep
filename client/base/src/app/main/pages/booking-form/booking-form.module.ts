import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingFormComponent } from './booking-form.component';
import { BookingFormRoutes } from './booking-form.routing';

// primeng
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    StepsModule,
    ToastModule,
    BookingFormRoutes
  ],
  declarations: [BookingFormComponent],
})
export class BookingFormModule {}
