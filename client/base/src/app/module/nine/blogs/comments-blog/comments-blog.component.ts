import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { CommentsService } from 'src/app/module/_mShared/service/comments.service';

@Component({
  selector: 'comments-blog',
  templateUrl: './comments-blog.component.html',
  styleUrls: ['./comments-blog.component.scss']
})
export class CommentsBlogComponent implements OnInit {
  @Input() displayComment: boolean;
  @Input() blogId: any;
  @Output() closeModal = new EventEmitter<any>();
  constructor(
    private commentsService: CommentsService,
    private message: NzMessageService,) { }


  comments:any[] = []
  replyComments:any[] = []

  ngOnInit() {
    this.getComments();
  }

  getComments(){
    this.commentsService.getComments().subscribe({
      next: (res) => {
        this.comments = res.data;

        this.replyComments = this.comments.filter(rl => rl.blog.id == this.blogId && rl.parent_id)
        this.comments = this.comments.filter(cm => cm.blog.id == this.blogId && !cm.parent_id);

        console.log(this.comments)
        console.log(this.replyComments)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  handleOk(){

  }

  handleCancel(){
    this.closeModal.emit();
  }

}
