import { BookingClientService } from 'src/app/main/services/bookingClient.service';
import { Component, OnInit } from '@angular/core';
import { FeedbackClientService } from '../../services/feedback-client.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface FeedbackData {
  rating: number;
  content: string;
  booking_id: string;
}

@Component({
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  bookingNumber: any;
  feedbackForm: FormGroup;

  constructor(
    private feedbackClientService: FeedbackClientService,
    private bookingService: BookingClientService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.feedbackForm = this.formBuilder.group({
      rating: [0, Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]],
      booking_id: ['']
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.bookingNumber = params.get('booking_number');
      console.log('Booking Number:', this.bookingNumber);
    });
    this.getBooking();
  }

  getBooking() {
    let obs = this.bookingService.findByCode(this.bookingNumber).subscribe({
      next: (res) => {
        console.log(res.data)
        // Sử dụng setValue() hoặc patchValue() để gán giá trị vào FormGroup
        this.feedbackForm.patchValue({
          booking_id: res.data[0].id
        });
      },
      error: (err) => {
        console.log('Lỗi');
      }
    });
  }

  submitForm() {
    if (this.feedbackForm.valid) {
      const formData = this.feedbackForm.value; // Lấy dữ liệu từ FormGroup
      this.feedbackClientService.createFeedback(formData).subscribe(
        (response) => {
          console.log('Feedback created successfully:', response);
          window.location.href = '/';
        },
        (error) => {
          console.error('Error creating feedback:', error);
        }
      );
    }
  }
}
