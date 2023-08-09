import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  CouponId: any
  discountAmount: any

  description: string = '';

  filteredBrands: any[] = [];

  paymentData: any;
  paymentForm: FormGroup;
  bookingId: any;
  banks: any[] = [
    { label: 'Ngan hang NCB', value: 'NCB' },
    { label: 'Ngan hang HDBank', value: 'HDBANK' },
    { label: 'Ngan hang Dong A', value: 'DONGABANK' },
    { label: 'Ngân hàng TPBank ', value: 'TPBANK' },
    { label: 'Ngân hàng BIDV ', value: 'BIDV' },
    { label: 'Ngân hàng Techcombank ', value: 'TECHCOMBANK' },
    { label: 'Ngan hang VPBank ', value: 'VPBANK' },
    { label: 'Ngan hang Agribank ', value: 'AGRIBANK' },
    // Add more banks as needed
  ];




  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private message: NzMessageService,
    private BookingClientService: BookingClientService,
    private HotelClientService: HotelClientService,
    private PaymentService: PaymentService,
    private fb: FormBuilder,
    private route: Router
    ) {

  }
  ngOnInit() {
    this.paymentForm = this.fb.group({
      id: [null, Validators.required],
      bank_code: ['', Validators.required],
      // redirect: ''
    });

    // Lấy dữ liệu từ sessionStorage
    const resData = sessionStorage.getItem('resData');
    const hotel_Id = sessionStorage.getItem('hotel_Id');
    const totalAmount = sessionStorage.getItem('totalAmount');
    const CouponId = sessionStorage.getItem('CouponId');
    const discountAmount = sessionStorage.getItem('discountAmount');
    const roomTypeArrayJson = sessionStorage.getItem('roomTypeArray');
    if (roomTypeArrayJson) {
      this.roomTypeData = JSON.parse(roomTypeArrayJson);
    }
    // Kiểm tra và sử dụng dữ liệu
    if (this.roomTypeData.length > 0 && resData && hotel_Id) {
      var paymentObjData = JSON.parse(resData);
      this.paymentData = paymentObjData;
      this.paymentForm.controls['id'].setValue(paymentObjData.id);
      this.bookingId = paymentObjData.id;
      this.displayDateIn = moment(this.paymentData.checkin_date).format('ddd, DD MMM YYYY');
      this.displayDateOut = moment(this.paymentData.checkout_date).format('ddd, DD MMM YYYY');
      this.totalAmount = totalAmount;
      this.CouponId = CouponId;
      this.discountAmount = discountAmount;

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

  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const selectedBankValue = this.paymentForm.value.bank_code;
      const bookingId = this.paymentForm.value.id;
      // Do something with the selected bank value
      console.log('Booking id: ', bookingId);
      console.log('Selected Bank: ', selectedBankValue);
      let create = this.PaymentService.createVnPay(this.paymentForm.value);
      create.subscribe({
        next: (res) => {
          console.log(res);

          this.message.create(SUCCESS, `${res.message}`);
          this.route.navigateByUrl(res.data)
          window.location.href = res.data
        },
        error: (err) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      })
    }
  }

  onePaySubmit() {
    if (this.bookingId) {
      const bookingId = this.paymentForm.value.id;
      const id = this.bookingId;
      console.log('Booking id: ', id);
      let create = this.PaymentService.createOnePay(id);
      create.subscribe({
        next: (res) => {
          console.log(res);
          // console.log('abc');


          // this.message.create(SUCCESS, `${res.message}`);
          // this.route.navigateByUrl(res.data)
          window.location.href = res
        },
        error: (err) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      })
    }
  }
}
