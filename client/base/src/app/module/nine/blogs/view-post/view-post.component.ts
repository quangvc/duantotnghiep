import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';


@Component({
  selector: 'view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  @Input() blogId: any;
  @Input() displayViewPost: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  @ViewChild('myElement', { static: true }) myElementRef: ElementRef;

  constructor(
    private blogsService: BlogsService,
    private message: NzMessageService
  ) { }

  dynamicHtml: string;

  ngOnInit() {
    this.getContentBlog();
  }

  getContentBlog(){
    if(this.blogId) {
      let obs = this.blogsService.findOne(this.blogId).subscribe({
        next: (res) => {
          this.dynamicHtml = res.data.content;
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }
      })

      this.subscription.add(obs);
    }
  }

  handleOk(){

  }

  handleCancel(){
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
