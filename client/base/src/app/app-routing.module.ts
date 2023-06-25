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
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
