import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Component
import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContractComponent } from './contract/contract.component';
import { RoomComponent } from './room/room.component';
import { ServiceComponent } from './service/service.component';
import { TeamComponent } from './team/team.component';
import { AppModule } from '../app.module';
import { HotelComponent } from './hotel/hotel.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { FormsModule } from '@angular/forms';
import { HotelDetailAmenitiesComponent } from './hotel-detail/hotel-detail-amenities/hotel-detail-amenities.component';
import { HotelPolicyComponent } from './hotel-detail/hotel-policy/hotel-policy.component';
import { HotelBookingRoomComponent } from './hotel-detail/hotel-booking-room/hotel-booking-room.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

// Primeng
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import {ScrollTopModule} from 'primeng/scrolltop'
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { GalleriaModule } from 'primeng/galleria';
import { StyleClassModule } from 'primeng/styleclass';
import { MenubarModule } from 'primeng/menubar';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PanelModule} from 'primeng/panel';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';




// Service
import { PhotoService } from 'src/services/photoservice.service';
import { ReviewComponent } from './booking-form/review/review.component';
import { BookingComponent } from './booking-form/booking/booking.component';
import { FilterPageComponent } from './filter-page/filter-page.component';





@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContractComponent,
    RoomComponent,
    ServiceComponent,
    TeamComponent,
    HotelComponent,
    CarouselComponent,
    HotelDetailComponent,
    HotelDetailAmenitiesComponent,
    HotelPolicyComponent,
    HotelBookingRoomComponent,
    BookingFormComponent,
    ReviewComponent,
    BookingComponent,
    FilterPageComponent

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AppModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    DropdownModule,
    ScrollTopModule,
    ScrollPanelModule,
    GalleriaModule,
    StyleClassModule,
    MenubarModule,
    StepsModule,
    InputTextModule,
    DialogModule,
    InputTextareaModule,
    PanelModule,
    MessageModule,
    ToastModule,
    AutoCompleteModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    AccordionModule,
    SliderModule,
    PaginatorModule
  ]
})
export class MainModule { }
