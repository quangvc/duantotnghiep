import { NgModule } from '@angular/core';
import { NineLayoutComponent } from './view/nine-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NineLayoutRoutes } from './nine-layout.routing';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { InfomationComponent } from './infomation/infomation.component';

@NgModule({
  imports: [
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    SharedModule,
    NzAvatarModule,
    NineLayoutRoutes,
  ],
  declarations: [NineLayoutComponent, InfomationComponent]
})
export class NineLayoutModule { }
