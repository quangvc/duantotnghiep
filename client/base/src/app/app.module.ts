import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NineModule } from './module/nine/nine.module';

import { LoginComponent } from './auth/login/view/login.component';
import { RegisterComponent } from './auth/register/view/register.component';
import { SharedModule } from './_shared/shared/shared.module';
import { MainGlobalModule } from './main/main-global.module';
import { LineClampComponent } from './main/share/line-clamp/line-clamp.component';
import { ErrorMsgModule } from './module/_mShared/error-msg/error-msg.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ForgotPasswordComponent } from './auth/login/forgot-password/forgot-password.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { StepEmailComponent } from './auth/login/component-step/step-email.component';
import { StepCodeComponent } from './auth/login/component-step/step-code.component';
import { StepPasswordComponent } from './auth/login/component-step/step-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

registerLocaleData(en);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    //step
    StepEmailComponent,
    StepCodeComponent,
    StepPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MessagesModule,
    NineModule,
    MainGlobalModule,
    MessageModule,
    SharedModule,
    FormsModule,
    NzStepsModule,

    ErrorMsgModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US, },
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
