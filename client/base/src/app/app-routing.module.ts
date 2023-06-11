import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/view/login.component';
import { RegisterComponent } from './auth/register/view/register.component';
import { MainComponent } from './main/main/main.component';
import { HomeComponent } from './main/home/home.component';
import { BookingComponent } from './main/booking/booking.component';
import { AboutComponent } from './main/about/about.component';
import { ContractComponent } from './main/contract/contract.component';
import { RoomComponent } from './main/room/room.component';
import { ServiceComponent } from './main/service/service.component';
import { TeamComponent } from './main/team/team.component';
import { HotelComponent } from './main/hotel/hotel.component';
import { HotelDetailComponent } from './main/hotel-detail/hotel-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '', component: MainComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contract', component: ContractComponent },
      { path: "room", component: RoomComponent },
      { path: "service", component: ServiceComponent },
      { path: "team", component: TeamComponent },
      { path: "hotel", component: HotelComponent },
      { path: "detail", component: HotelDetailComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
