import { NzMessageService } from 'ng-zorro-antd/message';
import { FeedbacksService } from './../../_mShared/service/feedbacks.service';
import { Component, OnInit } from '@angular/core';
import { ERROR } from '../../_mShared/model/url.class';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {

  constructor(
    private feedbacksService: FeedbacksService,
    private message: NzMessageService,
  ) { }

  feedbacks: any[] = [];

  ngOnInit() {
    this.getFeedbacks();
  }

  getFeedbacks(){
    this.feedbacksService.getFeedbacks().subscribe({
      next: (res) => {
        this.feedbacks = res.data;
        console.log(res)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

}
