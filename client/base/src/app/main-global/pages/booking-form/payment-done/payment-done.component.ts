import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/main-global/services/payment.service';

@Component({
  selector: 'app-payment-done',
  templateUrl: './payment-done.component.html',
  styleUrls: ['./payment-done.component.scss']
})
export class PaymentDoneComponent implements OnInit {
  vnpParams: any;
  baseUrl: any;
  constructor(private route: ActivatedRoute, private paymentService: PaymentService,) { }


  ngOnInit() {
    // Subscribe to the route query parameters to get the data
    this.route.queryParams.subscribe(params => {
      this.vnpParams = params;
      console.log(this.vnpParams);
      // Cắt đoạn param sau dấu "?"
      this.baseUrl = window.location.href.split('?')[1];
      console.log('BaseUrl:', this.baseUrl);
      this.paymentDone(this.baseUrl);
      // if (this.vnpParams.vnp_ResponseCode === '00') {
      //   this.sendMail(this.vnpParams.vnp_TxnRef)
      // } else {
      //   console.log('Đã gửi mail')
      // }

    });

  }
  paymentDone(baseUrl: any) {
    this.paymentService.vnPayDone(baseUrl).subscribe({
      next: (res) => {

        console.log(res);
        if (res.RspCode === '00') {
          this.sendMail(this.vnpParams.vnp_TxnRef)
        } else {
          console.log('Đã gửi mail')
        }
      },
      error: (err) => {{
        console.log('Đã xảy ra lỗi khi gọi API:', err);
      }}
    });
  }
  sendMail(bookingNumber: any) {
    this.paymentService.sendMail(bookingNumber).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {{
        console.log('Đã xảy ra lỗi khi gọi API:', err);
      }}
    });
  }
}
