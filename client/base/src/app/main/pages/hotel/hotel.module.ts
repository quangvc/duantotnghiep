import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel.component';
import { HotelRoutes } from './hotel.routing';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { HotelClientService } from '../../services/hotelClient.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { LineClampComponent } from '../../share/line-clamp/line-clamp.component';
import { RatingModule } from 'primeng/rating';
//primemg
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutes,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule,
    AccordionModule,
    CheckboxModule,
    PaginatorModule,
    SliderModule,
  ],
  declarations: [
    HotelComponent,
  ],
  providers: [HotelClientService, HotelsService, RegionsClientService,],
})
export class HotelModule { }
