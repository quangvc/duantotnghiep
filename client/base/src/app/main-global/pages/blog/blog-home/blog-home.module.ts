import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog-home.component';
import { BlogRoutes } from './blog-home.routing';
import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';
import { BlogClientService } from 'src/app/main-global/services/blogClient.service';
import { LineClampComponent } from 'src/app/main-global/share/line-clamp/line-clamp.component';




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
