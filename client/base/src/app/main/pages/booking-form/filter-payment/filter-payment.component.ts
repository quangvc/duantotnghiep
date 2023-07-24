import { Component } from '@angular/core';
import * as moment from 'moment';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { BookingClientService } from 'src/app/main/services/bookingClient.service';
import { StatusHelper } from 'src/shared/helpers/BookingHelper';

@Component({
  selector: 'app-filter-payment',
  templateUrl: './filter-payment.component.html',
  styleUrls: ['./filter-payment.component.scss']
})
export class FilterPaymentComponent {
  searchCode: string;
  showTable: boolean = false;
  data: any[];
  bookingDate: any;
  statusText: any;
  cols: any[] = [];
  loading: boolean;

  constructor(private bookingClientService: BookingClientService, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.loading = true;
    this.primengConfig.ripple = true;
  }

  onSearch() {
    console.log(this.searchCode);

    this.bookingClientService.findByCode(this.searchCode).subscribe(
      (response) => {
        this.data = response.data;
        this.showTable = true;
        this.bookingDate = moment(response.data[0].booking_date).format('DD-MM-YYYY');
        this.statusText = StatusHelper.getStatusText(response.data[0].status);
        // this.setupColumns();
      },
      (error) => {
        this.showTable = true;
        this.data = [];
        // this.setupColumns();
      }
    );
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
        if (this.data.length > 0) {
            this.loading = false;
        }
    }, 1000);
  }

  // setupColumns() {
  //   this.cols = [
  //     { field: 'booking_number', header: 'Mã đơn' },
  //     { field: 'booking_date', header: 'Ngày đặt' },
  //     { field: 'checkin_date', header: 'Thời gian Check in' },
  //     { field: 'checkout_date', header: 'Thời gian Check out' },
  //     { field: 'people_quantity', header: 'Số lượng người' },
  //     { field: 'coupon', header: 'Mã giảm giá' },
  //     { field: 'guest_name', header: 'Tên khách' },
  //     { field: 'guest_email', header: 'Email khách' },
  //     { field: 'guest_phone', header: 'SĐT khách' },
  //     { field: 'total_price', header: 'Tổng giá' },
  //     { field: 'status', header: 'Trạng thái' },
  //   ];
  // }
}
