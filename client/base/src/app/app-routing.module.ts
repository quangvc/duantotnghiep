import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/view/login.component';
import { RegisterComponent } from './auth/register/view/register.component';
import { MainComponent } from './main/main/main.component';
import { HomeComponent } from './main/home/home.component';
import { AboutComponent } from './main/about/about.component';
import { ContractComponent } from './main/contract/contract.component';
import { RoomComponent } from './main/room/room.component';
import { ServiceComponent } from './main/service/service.component';
import { TeamComponent } from './main/team/team.component';
import { HotelComponent } from './main/hotel/hotel.component';
import { HotelDetailComponent } from './main/hotel-detail/hotel-detail.component';
import { BookingFormComponent } from './main/booking-form/booking-form.component';
import { ReviewComponent } from './main/booking-form/review/review.component';
import { BookingComponent } from './main/booking-form/booking/booking.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilterPageComponent } from './main/filter-page/filter-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '', component: MainComponent,
    children: [
      { path: "home", component: HomeComponent },

      { path: 'about', component: AboutComponent },
      { path: 'contract', component: ContractComponent },
      { path: "room", component: RoomComponent },
      { path: "service", component: ServiceComponent },
      { path: "team", component: TeamComponent },
      { path: "hotel", component: HotelComponent },
      { path: "detail", component: HotelDetailComponent },
      { path: "filter", component: FilterPageComponent },

    ],
  },
  { path: 'booking', redirectTo: '/booking/bookingform', pathMatch: 'full' },
  {
    path: 'booking', component: BookingFormComponent,
    children: [
      { path: 'review', component: ReviewComponent },
      { path: 'bookingform', component: BookingComponent },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
