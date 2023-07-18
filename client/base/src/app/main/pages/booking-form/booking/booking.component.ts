import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MessageService, ConfirmationService } from 'primeng/api';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { BookingClientService } from 'src/app/main/services/bookingClient.service';
import { HotelClientService } from 'src/app/main/services/hotelClient.service';

const toggleButton = document.getElementById('showToggleButton') as HTMLButtonElement | null;

const content = document.getElementById('content') as HTMLDivElement | null;

if (toggleButton && content) {
  toggleButton.addEventListener('click', () => {
    if (content.style.display === 'none') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
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
export class BookingComponent implements OnInit {
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


  genders: SelectItem[] = [];

  description: string = '';

  filteredBrands: any[] = [];




  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private message: NzMessageService,
    private BookingClientService: BookingClientService,
    private HotelClientService: HotelClientService,
    ) {

  }
  ngOnInit() {
    // Khai báo các trường dữ liệu của form
    this.userform = this.fb.group({
      'guest_name': new FormControl(null, Validators.required),
      'guest_phone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
      'guest_email': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]),
      'hotel_id': new FormControl(null, Validators.required),
      'checkin_date': new FormControl(null, Validators.required),
      'checkout_date': new FormControl(null, Validators.required),
      'people_quantity': new FormControl(5),
      'total_price': new FormControl(null, Validators.required),
      'items': this.fb.array([]),
    });

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



      // Thêm dữ liệu từ sessionStorage vào form
      const itemsArray = this.userform.get('items') as FormArray;
      resultArray.forEach(item => {
        const newItem = this.fb.group({
          'room_type_id': new FormControl(item.roomType_Id, Validators.required),
          'quantity': new FormControl(item.quantity, Validators.required)
        });
        itemsArray.push(newItem);
      });
      this.userform.patchValue({
        'hotel_id': hotelId,
        'checkin_date': dateIn || null,
        'checkout_date': dateOut || null,
        'total_price': totalAmount || null,
      });
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

  // Hiển thị dữ liệu items (room type)
  get items(): FormArray {
    return this.userform.get('items') as FormArray;
  }

  async onSubmit() {
    const formValue = this.userform.value;
    if (this.userform.valid) {
      // Xử lý khi form hợp lệ
      console.log(formValue);
      this.confirmationService.confirm({
        message: 'Bạn có chắc chắn thông tin đã đúng chứ?',
        accept: async() => {
          debugger
          let newData = this.userform.value;
          let create = this.BookingClientService.createBooking(newData);
          await create.subscribe({
            next: (res) => {

              this.message.create(SUCCESS, `Đăng ký thành công!`);
              // sessionStorage.clear();
              window.location.href = 'booking/payment'

            },
            error: (err) => {
              this.message.create(ERROR, err.error.message);
            }
      })
        },
        reject: () => {
          // Xử lý khi nhấn No
          // Đóng confirm popup
        }
      });




    } else {
      // Xử lý khi form không hợp lệ
      this.messageService.add({ severity: 'warn', summary: 'Cảnh báo', detail: 'Bạn chưa nhập đủ thông tin' });
    }
  }

}
