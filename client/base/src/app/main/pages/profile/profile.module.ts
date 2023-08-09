import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { UserDetailPaymentComponent } from './user-detail-payment/user-detail-payment.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [ProfileComponent, UserDetailPaymentComponent],
  imports: [
    CommonModule,
    ProfileRoutes,
    ButtonModule,
    ConfirmDialogModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    TableModule,
    SharedModule,
    NzTabsModule,
    NzTagModule,
  ],
  providers: [ConfirmationService],
})
export class ProfileModule { }
