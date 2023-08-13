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
import { NgxPaginationModule } from 'ngx-pagination';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingModule } from 'ngx-loading';
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
    NgxPaginationModule,
    NgxLoadingModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    }),
  ],
  declarations: [
    HotelComponent,
  ],
  providers: [HotelClientService, HotelsService, RegionsClientService,],
})
export class HotelModule { }
