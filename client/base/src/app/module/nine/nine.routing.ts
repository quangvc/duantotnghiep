import { Routes, RouterModule } from '@angular/router';
import { NineLayoutComponent } from './nine-layout/view/nine-layout.component';

const routes: Routes = [
  { path: 'nine', redirectTo: "nine", pathMatch: "full" },
  {path: 'nine', component: NineLayoutComponent, children: [
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    { path: 'hotels', loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule)},
    { path: 'regions', loadChildren: () => import('./regions/regions.module').then(m => m.RegionsModule)},
    { path: 'room-types', loadChildren: () => import('./room-types/room-types.module').then(m => m.RoomTypesModule)},
    { path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule)},
    { path: 'coupons', loadChildren: () => import('./coupons/coupons.module').then(m => m.CouponsModule)},
    { path: 'blogs', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule)},
    { path: 'banners', loadChildren: () => import('./banners/banners.module').then(m => m.BannersModule)},
  ]}
];

export const NineRoutes = RouterModule.forRoot(routes);
