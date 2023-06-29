import { NgModule } from '@angular/core';
import { BannersComponent } from './banners.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { BannersRoutes } from './banners.routing';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { QImageModule } from '../../_mShared/q-image/q-image.module';

@NgModule({
  imports: [
    SharedModule,
    NzUploadModule,
    QImageModule,
    BannersRoutes
  ],
  declarations: [BannersComponent]
})
export class BannersModule { }
