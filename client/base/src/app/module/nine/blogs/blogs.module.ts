import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './view/blogs.component';
import { CreateUpdateBlogComponent } from './create-update-blog/create-update-blog.component';
import { BlogsRoutes } from './blogs.routing';
import { BlogsService } from '../../_mShared/service/blogs.service';
import { QMenuModule } from '../../_mShared/q-menu/q-menu.module';
import { SharedModule } from 'src/app/_shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    QMenuModule,
    BlogsRoutes
  ],
  declarations: [BlogsComponent, CreateUpdateBlogComponent],
  providers: [BlogsService]
})
export class BlogsModule { }
