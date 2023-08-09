import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { BookingRoutes } from './booking.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//primeng
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookingClientService } from 'src/app/main/services/bookingClient.service';
import { PaymentService } from 'src/app/main/services/payment.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    MessageModule,
    PanelModule,
    DropdownModule,
    AccordionModule,
    BookingRoutes,
    ButtonModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule
  ],
  declarations: [BookingComponent],
  providers: [
    ConfirmationService,
    MessageService,
    BookingClientService,
    PaymentService
  ],
})
export class BookingModule { }
