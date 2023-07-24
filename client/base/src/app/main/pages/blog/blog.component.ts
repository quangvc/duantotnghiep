import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { BlogClientService } from '../../services/blogClient.service';

// import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{
  private subscription = new Subscription();

  constructor(
    private BlogClientService: BlogClientService,
    // private BlogsService: BlogsService,
    private message: NzMessageService,
    ) { }
  blogs: any[] = [];
  blogId: any;
  slug: any;
  menus: MenuItem[] = [];

  ngOnInit() {
    this.getBlogs();

  }

  getBlogs(){
    // let obs = this.BlogClientService.getBlogs().subscribe({
    let obs = this.BlogClientService.getBlogs().subscribe({
      next: (res) => {
        this.blogs = res.data;
        console.log(res)
      },
      error: (err) => {{
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }
}
