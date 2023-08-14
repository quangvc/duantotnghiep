import { Routes, RouterModule } from '@angular/router';
import { MainGlobalComponent } from './main-global.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LoginComponent } from '../auth/login/view/login.component';
import { RegisterComponent } from '../auth/register/view/register.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';



const routes: Routes = [

  { path: '', component: MainGlobalComponent, children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
    { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)},
    { path: 'blogs', loadChildren: () => import('./pages/blog/blog-home/blog-home.module').then(m => m.BlogModule)},
    { path: 'blogs/:slug', loadChildren: () => import('./pages/blog/blog-detail/blog-detail.module').then(m => m.BlogDetailModule)},
    { path: 'contract', loadChildren: () => import('./pages/contract/contract.module').then(m => m.ContractModule)},

    { path: 'hotel/:id', loadChildren: () => import('./pages/hotel-detail/hotel-detail.module').then(m => m.HotelDetailModule)},
    { path: 'hotels/get/:region_id/:checkin/:checkout', loadChildren: () => import('./pages/filter-page/filter-page.module').then(m => m.FilterPageModule)},
    { path: 'hotels/region/:region_id', loadChildren: () => import('./pages/hotel/hotel.module').then(m => m.HotelModule)},

    { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
    { path: 'filter-payment', loadChildren: () => import('./pages/booking-form/filter-payment/filter-payment.module').then(m => m.FilterPaymentModule)},

    {
      path: 'booking',
      redirectTo: 'booking/bookingform', // Chuyển hướng đến 'booking/review' khi người dùng truy cập '/booking'
      pathMatch: 'full',
    },

    { path: 'booking', loadChildren: () => import('./pages/booking-form/booking-form.module').then(m => m.BookingFormModule)}

  ]},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},

  { path: 'nine' , loadChildren: () => import('../module/nine/nine-layout/nine-layout.module').then(m => m.NineLayoutModule)},

  { path: 'support', loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)},
  { path: 'feedback', loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackModule)},

  { path: '**', component: NotFoundComponent },

];

export const MainGlobalRoutes = RouterModule.forChild(routes);
