import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutes } from './about.routing';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutes
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
