import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { BlogClientService } from 'src/app/main-global/services/blogClient.service';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { environment } from 'src/environments/environment';

// import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';

@Component({
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogComponent implements OnInit{
  private subscription = new Subscription();

  constructor(
    private blogClientService: BlogClientService,
    // private BlogsService: BlogsService,
    private message: NzMessageService,
    ) { }
  blogs: any[] = [];
  newBlog: any[] = [];
  blogId: any;
  slug: any;
  menus: MenuItem[] = [];
  p: any;

  urlRouter = `${environment.api}/Images/blog/`;

  ngOnInit() {
    this.getBlogs();

  }

  getBlogs(){
    // let obs = this.BlogClientService.getBlogs().subscribe({
    let obs = this.blogClientService.getBlogs().subscribe({
      next: (res) => {
        this.blogs = res.data;
        this.newBlog = res.data.slice(0, 5);
        console.log(res)
      },
      error: (err) => {{
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }
}
