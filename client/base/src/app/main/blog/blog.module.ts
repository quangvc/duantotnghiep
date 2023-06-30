import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogClientService } from 'src/app/services/blogClient.service';
import { BlogComponent } from './blog.component';
import { BlogRoutes } from './blog.routing';
import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';



@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutes
  ],
  providers: [BlogClientService, BlogsService]
})
export class BlogModule { }
