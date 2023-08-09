import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutes } from './payment.routing';
import { PaymentComponent } from './payment.component';
import { PanelModule } from 'primeng/panel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookingClientService } from 'src/app/main/services/bookingClient.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutes,
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,

  ],
  providers: [
    ConfirmationService,
    MessageService,
    BookingClientService
  ],
})
export class PaymentModule { }
