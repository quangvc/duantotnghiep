import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../not-found/not-found.component";
import { MainComponent } from "./main/main.component";
import { BookingFormComponent } from "./pages/booking-form/booking-form.component";
import { SupportComponent } from "./pages/support/support.component";
import { FeedbackComponent } from "./pages/feedback/feedback.component";

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
    { path: 'hotels/get/:region_id/:checkin/:checkout', loadChildren: () => import('./pages/filter-page/filter-page.module').then(m => m.FilterPageModule)},
    { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
    { path: 'filter-payment', loadChildren: () => import('./pages/booking-form/filter-payment/filter-payment.module').then(m => m.FilterPaymentModule)},
    {
      path: 'booking',
      redirectTo: 'booking/bookingform', // Chuyển hướng đến 'booking/review' khi người dùng truy cập '/booking'
      pathMatch: 'full',
    },
    {path: 'booking', component: BookingFormComponent, children: [
      { path: 'review', loadChildren: () => import('./pages/booking-form/review/review.module').then(m => m.ReviewModule)},
      { path: 'bookingform', loadChildren: () => import('./pages/booking-form/booking/booking.module').then(m => m.BookingModule)},
      { path: 'payment', loadChildren: () => import('./pages/booking-form/payment/payment.module').then(m => m.PaymentModule)},
      { path: 'payment-done', loadChildren: () => import('./pages/booking-form/payment-done/payment-done.module').then(m => m.PaymentDoneModule)}
    ]},

  ]},
  { path: 'support', component: SupportComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: '**', component: NotFoundComponent },


]

export const MainGlobalRoutes = RouterModule.forRoot(routes);
