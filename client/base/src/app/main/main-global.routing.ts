import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../not-found/not-found.component";
import { MainComponent } from "./main/main.component";
import { BookingFormComponent } from "./pages/booking-form/booking-form.component";

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
    { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)},
    { path: 'contract', loadChildren: () => import('./pages/contract/contract.module').then(m => m.ContractModule)},
    { path: 'blogs', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)},
    { path: 'blogs/:slug', loadChildren: () => import('./pages/blog/blog-detail/blog-detail.module').then(m => m.BlogDetailModule)},
    { path: 'hotels/region/:region_id', loadChildren: () => import('./pages/hotel/hotel.module').then(m => m.HotelModule)},
    { path: 'hotel/:id', loadChildren: () => import('./pages/hotel-detail/hotel-detail.module').then(m => m.HotelDetailModule)},
    { path: 'filter', loadChildren: () => import('./pages/filter-page/filter-page.module').then(m => m.FilterPageModule)},
    { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
    {
      path: 'payment',
      redirectTo: 'payment/bookingform', // Chuyển hướng đến 'booking/review' khi người dùng truy cập '/booking'
      pathMatch: 'full',
    },
    {path: 'payment', component: BookingFormComponent, children: [
      { path: 'review', loadChildren: () => import('./pages/booking-form/review/review.module').then(m => m.ReviewModule)},
      { path: 'bookingform', loadChildren: () => import('./pages/booking-form/booking/booking.module').then(m => m.BookingModule)}
    ]},

  ]},

  { path: '**', component: NotFoundComponent },


]

export const MainGlobalRoutes = RouterModule.forRoot(routes);
