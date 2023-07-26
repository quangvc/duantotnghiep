import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/main/services/payment.service';

@Component({
  selector: 'app-payment-done',
  templateUrl: './payment-done.component.html',
  styleUrls: ['./payment-done.component.scss']
})
export class PaymentDoneComponent implements OnInit {
  vnpParams: any;
  baseUrl: any;
  constructor(private route: ActivatedRoute, private PaymentService: PaymentService,) { }


  ngOnInit() {
    // Subscribe to the route query parameters to get the data
    this.route.queryParams.subscribe(params => {
      this.vnpParams = params;
      console.log(this.vnpParams);
      // Cắt đoạn param sau dấu "?"
      this.baseUrl = window.location.href.split('?')[1];
      console.log('BaseUrl:', this.baseUrl);
      this.paymentDone(this.baseUrl);
      this.sendMail(this.vnpParams.vnp_TxnRef)
    });

  }
  paymentDone(baseUrl: any) { // Lấy giá trị ID từ URL
    this.PaymentService.paymentDone(baseUrl).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {{
        console.log('Đã xảy ra lỗi khi gọi API:', err);
      }}
    });
  }
  sendMail(bookingNumber: any) { // Lấy giá trị ID từ URL
    this.PaymentService.sendMail(bookingNumber).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {{
        console.log('Đã xảy ra lỗi khi gọi API:', err);
      }}
    });
  }
}
