import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { ReviewRoutes } from './review.routing';

//primeng
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    ReviewRoutes
  ],
  declarations: [ReviewComponent]
})
export class ReviewModule { }
