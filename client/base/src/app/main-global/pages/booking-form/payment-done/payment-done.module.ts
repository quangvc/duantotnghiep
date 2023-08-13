import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDoneComponent } from './payment-done.component';
import { PaymentDoneRoutes } from './payment.routing';



@NgModule({
  declarations: [PaymentDoneComponent],
  imports: [
    CommonModule,
    PaymentDoneRoutes
  ]
})
export class PaymentDoneModule { }
