import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPaymentComponent } from './filter-payment.component';
import { FilterPaymentRoutes } from './filter-payment.routing';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';


@NgModule({
  declarations: [FilterPaymentComponent, PaymentDetailComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    FilterPaymentRoutes,
    SharedModule,
    NzTabsModule,
    NzTagModule,
  ]
})
export class FilterPaymentModule { }
