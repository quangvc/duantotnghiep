import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogDetailRoutes } from './blog-detail.routing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { BlogClientService } from 'src/app/main/services/blogClient.service';



@NgModule({
  declarations: [
    BlogDetailComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    BlogDetailRoutes
  ],
  providers: [BlogClientService]
})
export class BlogDetailModule { }
