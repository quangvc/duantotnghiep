import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackClientService } from 'src/app/main/services/feedback-client.service';

@Component({
  selector: 'hotel-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbacks: any[];
  rating: any;

  constructor(
    private FeedbackClientService: FeedbackClientService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    // this.PhotoService.getImages().then((images) => (this.images = images));
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.FeedbackClientService.getFeedbackByHotel(id).subscribe({
        next: (res) => {
          console.log(res);
          this.feedbacks = res;
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });
      this.FeedbackClientService.getHotelRating(id).subscribe({
        next: (res) => {
          console.log(res);
          this.rating = res;
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });
    });
  }
  truncateText(text: string, maxLines: number): string {
    const lines = text.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + '...';
    }
    return text;
  }
}
