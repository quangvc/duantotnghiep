import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { BookingComponent } from './booking/booking.component';
import { ContractComponent } from './contract/contract.component';
import { RoomComponent } from './room/room.component';
import { ServiceComponent } from './service/service.component';
import { TeamComponent } from './team/team.component';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    BookingComponent,
    ContractComponent,
    RoomComponent,
    ServiceComponent,
    TeamComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AppModule
  ]
})
export class MainModule { }
