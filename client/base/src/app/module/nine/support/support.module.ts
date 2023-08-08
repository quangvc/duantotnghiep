import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { SupportRoutes } from './support.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { NzTagModule } from 'ng-zorro-antd/tag';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NzTagModule,
    SupportRoutes
  ],
  declarations: [SupportComponent]
})
export class SupportModule { }
