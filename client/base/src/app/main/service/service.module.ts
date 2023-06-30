import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { ServiceRoutes } from './service.routing';

@NgModule({
  imports: [
    CommonModule,
    ServiceRoutes
  ],
  declarations: [ServiceComponent]
})
export class ServiceModule { }
