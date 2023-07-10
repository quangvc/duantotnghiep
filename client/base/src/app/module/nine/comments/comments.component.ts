import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../_mShared/service/comments.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from '../../_mShared/model/url.class';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor(
    private commentsService: CommentsService,
    private message: NzMessageService,
  ) { }

  comments: any[] = [];

  ngOnInit() {
    this.getComments();
  }

  getComments(){
    this.commentsService.getComments().subscribe({
      next: (res) => {
        this.comments = res.data;
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

}
