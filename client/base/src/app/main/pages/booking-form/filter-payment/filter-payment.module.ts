import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPaymentComponent } from './filter-payment.component';
import { FilterPaymentRoutes } from './filter-payment.routing';



@NgModule({
  declarations: [FilterPaymentComponent],
  imports: [
    CommonModule,
    FilterPaymentRoutes
  ]
})
export class FilterPaymentModule { }
