import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainGlobalComponent } from './main-global.component';
import { MainGlobalRoutes } from './main-global.routing';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from '../auth/login/view/login.component';
import { RegisterComponent } from '../auth/register/view/register.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '../auth/login/forgot-password/forgot-password.component';
import { StepEmailComponent } from '../auth/login/component-step/step-email.component';
import { SharedModule } from '../_shared/shared/shared.module';
import { ErrorMsgModule } from '../module/_mShared/error-msg/error-msg.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    SharedModule,
    ErrorMsgModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    MainGlobalRoutes
  ],
  declarations: [
    MainGlobalComponent,FooterComponent,HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    //step
    StepEmailComponent,
  ],
  providers: [MessageService]

})
export class MainGlobalModule { }
