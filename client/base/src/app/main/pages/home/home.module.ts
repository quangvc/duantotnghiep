import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { CarouselComponent } from './carousel/carousel.component';
import { HotelClientService } from '../../services/hotelClient.service';
import { RegionsClientService } from '../../services/regions-client.service';
import { BlogClientService } from '../../services/blogClient.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutes
  ],
  declarations: [HomeComponent, CarouselComponent],
  providers: [HotelClientService, RegionsClientService, BlogClientService],
})
export class HomeModule { }