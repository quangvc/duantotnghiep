import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutes } from './blog.routing';
import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';
import { BlogClientService } from '../../services/blogClient.service';
import { LineClampComponent } from '../../share/line-clamp/line-clamp.component';



@NgModule({
  declarations: [
    LineClampComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutes
  ],
  providers: [BlogClientService, BlogsService]
})
export class BlogModule { }
