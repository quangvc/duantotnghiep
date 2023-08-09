import { NgModule } from '@angular/core';
import { FeedbacksComponent } from './feedbacks.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { FeedbacksRoutes } from './feedbacks.routing';

@NgModule({
  imports: [
    SharedModule,
    FeedbacksRoutes
  ],
  declarations: [FeedbacksComponent]
})
export class FeedbacksModule { }
