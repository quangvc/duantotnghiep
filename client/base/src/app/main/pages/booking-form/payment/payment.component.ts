import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookingClientService } from 'src/app/main/services/bookingClient.service';
import { HotelClientService } from 'src/app/main/services/hotelClient.service';

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




  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private message: NzMessageService,
    private BookingClientService: BookingClientService,
    private HotelClientService: HotelClientService,
    ) {

  }
  ngOnInit() {

    // Lấy dữ liệu từ sessionStorage
    const resultArrayJson = sessionStorage.getItem('resultArray');
    const totalAmount = sessionStorage.getItem('totalAmount');
    const dateIn = sessionStorage.getItem('dateIn');
    const dateOut = sessionStorage.getItem('dateOut');
    const hotelId = sessionStorage.getItem('hotelId');

    let resultArray: any[] = [];

    if (resultArrayJson) {
      resultArray = JSON.parse(resultArrayJson);
    }

    // Kiểm tra và sử dụng dữ liệu
    if (resultArray.length > 0 && totalAmount && dateIn && dateOut && hotelId) {
      this.displayDateIn = moment(dateIn, 'DD-MM-YYYY').format('ddd, DD MMM YYYY');
      this.displayDateOut = moment(dateOut, 'DD-MM-YYYY').format('ddd, DD MMM YYYY');
      this.roomTypeData = resultArray;
      this.totalAmount = totalAmount;
      // Xóa dữ liệu từ sessionStorage sau khi đã sử dụng
      // sessionStorage.removeItem('resultArray');
      // sessionStorage.removeItem('totalAmount');
    } else {
      // Hiển thị thông báo lỗi
      alert("Không có dữ liệu trong sessionStorage");

      // Chuyển về trang trước đó
      window.history.back();
    }
    this.getHotel(hotelId);
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
}
