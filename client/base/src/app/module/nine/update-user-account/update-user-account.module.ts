import { NgModule } from '@angular/core';
import { UpdateUserAccountComponent } from './update-user-account.component';
import { UpdateUserAccountRoutes } from './update-user-account.routing';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { ErrorMsgModule } from '../../_mShared/error-msg/error-msg.module';

@NgModule({
  imports: [
    SharedModule,
    ErrorMsgModule,
    UpdateUserAccountRoutes
  ],
  declarations: [UpdateUserAccountComponent]
})
export class UpdateUserAccountModule { }
