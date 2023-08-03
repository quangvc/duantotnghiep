import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportComponent } from './support.component';
import { SupportRoutes } from './support.routing';



@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, SupportRoutes, FormsModule ],
})
export class SupportModule { }
