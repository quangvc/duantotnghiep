import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookingClientService } from 'src/app/main/services/bookingClient.service';
import { HotelClientService } from 'src/app/main/services/hotelClient.service';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  userform: FormGroup;
  selectedCountry: string;
  countries: any[];
  ingredient: string;
  submitted: boolean = true;

  // Dữ liệu hiển thị
  displayDateIn: any;
  displayDateOut: any;
  totalAmount: any;
  hotel_Id: any;
  hotels: any[] = [];
  hotel_name: any
  hotelRoomTypeData: any[] = [];
  roomTypeData: any[] = [];

  description: string = '';

  filteredBrands: any[] = [];

  paymentData: any;




  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private message: NzMessageService,
    private BookingClientService: BookingClientService,
    private HotelClientService: HotelClientService,
    private PaymentService: PaymentService,
    ) {

  }
  ngOnInit() {

    // Lấy dữ liệu từ sessionStorage
    const resData = sessionStorage.getItem('resData');
    const hotel_Id = sessionStorage.getItem('hotel_Id');
    const roomTypeArrayJson = sessionStorage.getItem('roomTypeArray');
    if (roomTypeArrayJson) {
      this.roomTypeData = JSON.parse(roomTypeArrayJson);
    }
    // Kiểm tra và sử dụng dữ liệu
    if (this.roomTypeData.length > 0 && resData && hotel_Id) {
      var paymentObjData = JSON.parse(resData);
      this.paymentData = paymentObjData;
      this.displayDateIn = moment(this.paymentData.checkin_date).format('ddd, DD MMM YYYY');
      this.displayDateOut = moment(this.paymentData.checkout_date).format('ddd, DD MMM YYYY');
      console.log(this.paymentData);
      console.log(this.roomTypeData);
    } else {
      // Hiển thị thông báo lỗi
      alert("Không có dữ liệu trong sessionStorage");
      // Chuyển về trang trước đó
      window.history.back();
    }

    this.getHotel(hotel_Id)
  }

  getHotel(id: any) { // Lấy giá trị ID từ URL
      this.HotelClientService.findOne(id).subscribe({

        next: (res) => {
          console.log(res);

          this.hotels = res.data;
          this.hotel_name = res.data[0].hotel_name;
          this.hotelRoomTypeData = res.data[0].room_type;
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });
  }
  paymentTransaction() {
    let createUpdate;
    createUpdate = this.PaymentService.createPayment(this.paymentData.id);

    createUpdate.subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `${res.message}`);
      },
      error: (err) => {
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
    })
  }
}
