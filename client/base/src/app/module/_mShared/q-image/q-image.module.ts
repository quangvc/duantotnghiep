import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QImageComponent } from './q-image.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    CommonModule,
    NzCheckboxModule,
    NzUploadModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [QImageComponent],
  declarations: [QImageComponent]
})
export class QImageModule { }
