import { NgModule } from '@angular/core';
import { UserComponent } from './view/user.component';
import { UserRoutes } from './user.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { QMenuModule } from '../../_mShared/q-menu/q-menu.module';
import { AddUserComponent } from './add/add-user.component';

@NgModule({
  imports: [
    UserRoutes,
    SharedModule,

    QMenuModule,
  ],
  declarations: [UserComponent,AddUserComponent]
})
export class UserModule { }
