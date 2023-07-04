import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../not-found/not-found.component";
import { MainComponent } from "./main/main.component";
import { BookingFormComponent } from "./booking-form/booking-form.component";

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
    { path: 'contract', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule)},
    { path: 'rooms', loadChildren: () => import('./room/room.module').then(m => m.RoomModule)},
    { path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule)},
    { path: 'blogs', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},
    { path: 'blogs/:slug', loadChildren: () => import('./blog/blog-detail/blog-detail.module').then(m => m.BlogDetailModule)},
    { path: 'hotels', loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule)},
    { path: 'hotel/:id', loadChildren: () => import('./hotel-detail/hotel-detail.module').then(m => m.HotelDetailModule)},
    { path: 'filter', loadChildren: () => import('./filter-page/filter-page.module').then(m => m.FilterPageModule)},
    // {path: 'booking', component: BookingFormComponent, redirectTo: '/booking/bookingform', pathMatch: 'full', children: [
    //   { path: 'review', loadChildren: () => import('./booking-form/review/review.module').then(m => m.ReviewModule)},
    //   { path: 'bookingform', loadChildren: () => import('./booking-form/booking/booking.module').then(m => m.BookingModule)}
    // ]},

  ]},

  { path: '**', component: NotFoundComponent },


]

export const MainGlobalRoutes = RouterModule.forRoot(routes);
