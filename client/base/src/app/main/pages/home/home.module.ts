import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { CarouselComponent } from './carousel/carousel.component';
import { HotelClientService } from '../../services/hotelClient.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { BlogClientService } from '../../services/blogClient.service';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutes,
    ButtonModule,
    CarouselModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    CalendarModule
  ],
  declarations: [HomeComponent, CarouselComponent],
  providers: [HotelClientService, RegionsClientService, BlogClientService],
})
export class HomeModule { }
