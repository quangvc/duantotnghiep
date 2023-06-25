import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPageComponent } from './filter-page.component';
import { FilterPageRoutes } from './filter-page.routing';

//primemg
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    AccordionModule,
    RadioButtonModule,
    CheckboxModule,
    PaginatorModule,
    SliderModule,

    FilterPageRoutes
  ],
  declarations: [FilterPageComponent]
})
export class FilterPageModule { }
