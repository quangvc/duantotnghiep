import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { NineStatus } from 'src/app/module/_mShared/enum/enum';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { Enum } from 'src/app/module/_mShared/service/static/enum.service';

import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  private subscription = new Subscription();

  displayCreateUpdateBlog: boolean = false;

  constructor(
    private BlogsService: BlogsService,
    private message: NzMessageService,
    private modal: NzModalService
    ) { }

  blogs: any[] = [];
  blogId: any;
  menus: MenuItem[] = [];
  statusOption: any;

  confirmModal?: NzModalRef;

  ngOnInit() {
    this.getBlogs();
    this.getOptionEnum();
  }

  getOptionEnum(){
    this.statusOption = Enum.convertEnum(NineStatus);
  }

  getBlogs(){
    let obs = this.BlogsService.getBlogs().subscribe({
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

  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Chỉnh sửa",
        command: () => {
          this.editBlog(data);
        },
      },
      { separator: true},
      {
        label: "Xóa",
        command: () => {
          this.showConfirm(data);
        },
      },
    ]
  }

  addBlog(){
    this.displayCreateUpdateBlog = true;
  }

  editBlog(blog:any){
    this.displayCreateUpdateBlog = true;
    this.blogId = blog.id;
  };

  cancel(event:any){
    this.displayCreateUpdateBlog = false;
    this.getBlogs();
  }

  showConfirm(data:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to delete ${data.name} ?`,
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteBlog(data);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  deleteBlog(data:any){
    this.BlogsService.deleteBlog(data.id).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `Xóa ${data.name} thành công.`)
        this.getBlogs();
      },
      error: (err) => {
        this.message.create(ERROR, `${err.message}`)
      }
    })
  }

  }
