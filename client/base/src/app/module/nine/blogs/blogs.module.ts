import { NgModule } from '@angular/core';
import { BlogsComponent } from './view/blogs.component';
import { CreateUpdateBlogComponent } from './create-update-blog/create-update-blog.component';
import { BlogsRoutes } from './blogs.routing';
import { BlogsService } from '../../_mShared/service/blogs.service';
import { QMenuModule } from '../../_mShared/q-menu/q-menu.module';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';


@NgModule({
  imports: [
    SharedModule,
    QMenuModule,
    EditorModule,
    BlogsRoutes
  ],
  declarations: [BlogsComponent, CreateUpdateBlogComponent],
  providers: [
    BlogsService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class BlogsModule { }
