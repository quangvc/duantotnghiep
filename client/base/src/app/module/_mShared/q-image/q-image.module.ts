import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QImageComponent } from './q-image.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  imports: [
    CommonModule,
    NzCheckboxModule,
    NzUploadModule,
    FormsModule
  ],
  exports: [QImageComponent],
  declarations: [QImageComponent]
})
export class QImageModule { }
