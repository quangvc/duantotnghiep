import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPaymentComponent } from './filter-payment.component';
import { FilterPaymentRoutes } from './filter-payment.routing';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FilterPaymentComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    FilterPaymentRoutes
  ]
})
export class FilterPaymentModule { }
