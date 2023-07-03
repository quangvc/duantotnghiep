import { NgModule } from '@angular/core';
import { RegionsComponent } from './view/regions.component';
import { RegionsRoutes } from './regions.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { CreateUpdateRegionComponent } from './create-update-region/create-update-region.component';
import { QMenuModule } from '../../_mShared/q-menu/q-menu.module';

@NgModule({
  imports: [
    SharedModule,
    RegionsRoutes,
    QMenuModule
  ],
  declarations: [RegionsComponent, CreateUpdateRegionComponent]
})
export class RegionsModule { }
