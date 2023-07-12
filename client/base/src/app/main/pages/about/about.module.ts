import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutes } from './about.routing';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutes
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
