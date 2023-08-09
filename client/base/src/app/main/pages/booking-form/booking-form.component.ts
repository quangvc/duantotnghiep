import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  providers: [MessageService],
  styles: [`
      :host ::ng-deep .forms-grid > div {
          display: flex;
          align-items: center;
          padding: 1em;
      }

      :host ::ng-deep .forms-grid > div > div:first-child {
         min-width: 10em;
      }

      input, textarea {
          flex: 1 1 auto;
      }

      :host ::ng-deep .ui-message {
          margin-left: 1em;
      }

      @media screen and (max-width: 64em) {
          :host ::ng-deep .ui-message-text {
              display: none;
          }
      }
  `]
})
export class BookingFormComponent implements OnInit {

  items: MenuItem[] = [];
  activeIndex: number = 0;
  ngOnInit() {
    this.items = [
      {
        label: 'Đặt',
        routerLink: 'bookingform'
      },
      {
        label: 'Thanh toán',
        routerLink: 'payment'
      },
      {
        label: 'Hoàn thành',
        routerLink: 'payment-done'
      }
    ];


  }
}

