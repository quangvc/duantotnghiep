import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponsComponent } from './view/coupons.component';
import { CreateUpdateCouponComponent } from './create-update-coupon/create-update-coupon.component';
import { CouponsRoutes } from './coupons.routing';
import { CouponsService } from '../../_mShared/service/coupons.service';
import { QMenuModule } from '../../_mShared/q-menu/q-menu.module';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { ErrorMsgModule } from '../../_mShared/error-msg/error-msg.module';


@NgModule({
  imports: [
    SharedModule,
    QMenuModule,
    ErrorMsgModule,
    CouponsRoutes
  ],
  declarations: [CouponsComponent, CreateUpdateCouponComponent],
  providers: [CouponsService]
})
export class CouponsModule { }
