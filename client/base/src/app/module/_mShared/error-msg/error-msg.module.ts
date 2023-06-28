import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMsgComponent
  ],
  declarations: [ErrorMsgComponent]
})
export class ErrorMsgModule { }
