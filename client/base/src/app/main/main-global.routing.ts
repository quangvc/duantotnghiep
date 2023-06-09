import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../not-found/not-found.component";
import { MainComponent } from "./main/main.component";
import { BookingComponent } from "./booking/booking.component";

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
    { path: 'contract', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule)},
    { path: 'room', loadChildren: () => import('./room/room.module').then(m => m.RoomModule)},
    { path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule)},
    { path: 'team', loadChildren: () => import('./team/team.module').then(m => m.TeamModule)},
    { path: 'hotel', loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule)},
    { path: 'detail', loadChildren: () => import('./hotel-detail/hotel-detail.module').then(m => m.HotelDetailModule)},
    { path: 'filter', loadChildren: () => import('./filter-page/filter-page.module').then(m => m.FilterPageModule)},
    { path: '**', component: NotFoundComponent },
  ]},

  {path: 'booking', component: BookingComponent, children: [
    { path: 'review', loadChildren: () => import('./booking-form/review/review.module').then(m => m.ReviewModule)},
    { path: 'bookingform', loadChildren: () => import('./booking-form/booking/booking.module').then(m => m.BookingModule)},
    { path: '**', component: NotFoundComponent },
  ]}
]

export const MainGlobalRoutes = RouterModule.forRoot(routes);
