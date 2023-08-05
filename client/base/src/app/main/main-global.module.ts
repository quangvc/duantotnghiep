import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './main/main.module';
import { MainGlobalRoutes } from './main-global.routing';
import { BookingFormModule } from './pages/booking-form/booking-form.module';
import { SupportModule } from './pages/support/support.module';
import { FeedbackModule } from './pages/feedback/feedback.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainModule,
    MainGlobalRoutes,
  ]
})
export class MainGlobalModule { }
