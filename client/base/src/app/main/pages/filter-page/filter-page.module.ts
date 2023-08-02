import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPageComponent } from './filter-page.component';
import { FilterPageRoutes } from './filter-page.routing';

//primemg
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { DialogService } from 'primeng/dynamicdialog';
import { ImagesClientService } from '../../services/images-client.service';
import { roomTypeClientService } from '../../services/room-type-client.service';
import { CalendarModule } from 'primeng/calendar';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    AccordionModule,
    RadioButtonModule,
    CheckboxModule,
    PaginatorModule,
    SliderModule,
    RatingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FilterPageRoutes
  ],
  declarations: [FilterPageComponent],
  providers: [DialogService, ImagesClientService, roomTypeClientService],
})
export class FilterPageModule { }
