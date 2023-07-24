import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutes } from './main.routing';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutes
  ],
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export class MainModule { }
