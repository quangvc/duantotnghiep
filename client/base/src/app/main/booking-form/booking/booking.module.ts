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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    MessageModule,
    PanelModule,
    DropdownModule,
    AccordionModule,
    BookingRoutes
  ],
  declarations: [BookingComponent]
})
export class BookingModule { }
