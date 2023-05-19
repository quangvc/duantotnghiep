import { NgModule } from '@angular/core';
import { QMenuComponent } from './q-menu.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SharedModule } from 'src/app/_shared/shared/shared.module';

@NgModule({
  imports: [
    NzDropDownModule,
    NzMenuModule,
    NzDividerModule,
    SharedModule
  ],
  declarations: [QMenuComponent],
  exports: [QMenuComponent]
})
export class QMenuModule { }
