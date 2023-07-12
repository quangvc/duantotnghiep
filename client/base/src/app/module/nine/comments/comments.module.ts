import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentsRoutes } from './comments.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommentsRoutes
  ],
  declarations: [CommentsComponent]
})
export class CommentsModule { }
