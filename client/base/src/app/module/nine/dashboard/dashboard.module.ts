import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './view/dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { ChartModule } from 'primeng/chart';

@NgModule({
  imports: [
    ChartModule,
    DashboardRoutes,
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
