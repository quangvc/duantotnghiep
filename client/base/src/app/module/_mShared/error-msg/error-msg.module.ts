import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ErrorMsgComponent
  ],
  declarations: [ErrorMsgComponent]
})
export class ErrorMsgModule { }
