import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-done',
  templateUrl: './payment-done.component.html',
  styleUrls: ['./payment-done.component.scss']
})
export class PaymentDoneComponent implements OnInit {
  vnpParams: any;

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    // Subscribe to the route query parameters to get the data
    this.route.queryParams.subscribe(params => {
      this.vnpParams = params;
      console.log(this.vnpParams);

    });
  }
}
