import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NineLayoutComponent } from './view/nine-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NineLayoutRoutes } from './nine-layout.routing';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from 'src/app/_shared/shared/shared.module';

@NgModule({
  imports: [
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NineLayoutRoutes,
    SharedModule
  ],
  declarations: [NineLayoutComponent]
})
export class NineLayoutModule { }
