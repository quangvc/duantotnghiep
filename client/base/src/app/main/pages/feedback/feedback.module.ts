import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutes } from './feedback.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RatingModule} from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FeedbackRoutes,
    ReactiveFormsModule,
    FormsModule,
    RatingModule,
    ToastModule,
  ]
})
export class FeedbackModule { }
