import { CouponClientService } from './../../../services/coupon-client.service';
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
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  hotel_name: any;
  hotelRoomTypeData: any[] = [];
  roomTypeData: any[] = [];
  coupons: any[] = []
  notLogin: boolean = true;
  selectedCoupon: any;
  discountAmount: number = 0;
  selectedCouponId: any;
  originalTotalAmount: number;
  currentTotalAmount: number;
  showCouponInputFlag: boolean = false;
  couponCode: string;
  showBtnApply: boolean = true;

  // Dữ liệu được trả lại sau khi thêm đơn
  resData: any

  genders: SelectItem[] = [];

  description: string = '';

  filteredBrands: any[] = [];
  now = moment().format('yyyy-MM-DD')


  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private message: NzMessageService,
    private BookingClientService: BookingClientService,
    private HotelClientService: HotelClientService,
    private CouponClientService: CouponClientService,
    private router: Router,
  ) {

  }
  ngOnInit() {
    this.checkLogin();

    // Khai báo các trường dữ liệu của form
    this.userform = this.fb.group({
      'user_id': new FormControl(null),
      'guest_name': new FormControl(null, Validators.required),
      'guest_phone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
      'guest_email': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]),
      'hotel_id': new FormControl(null, Validators.required),
      'checkin_date': new FormControl(null, Validators.required),
      'checkout_date': new FormControl(null, Validators.required),
      'people_quantity': new FormControl(5),
      'total_price': new FormControl(null, Validators.required),
      'items': this.fb.array([]),
      'coupon_id': new FormControl(null)

    });

    // Lấy dữ liệu từ sessionStorage
    const resultArrayJson = sessionStorage.getItem('resultArray');
    let resultArray: any[] = [];
    if (resultArrayJson) {
      resultArray = JSON.parse(resultArrayJson);
    }
    const totalAmount = sessionStorage.getItem('totalAmount');
    const dateIn = sessionStorage.getItem('dateIn');
    const dateOut = sessionStorage.getItem('dateOut');

    const hotelId = sessionStorage.getItem('hotelId');

    this.hotel_Id = hotelId;



    // Kiểm tra và sử dụng dữ liệu
    if (resultArray.length > 0 && totalAmount && dateIn && dateOut && hotelId) {
      this.displayDateIn = moment(dateIn).format('ddd, DD MMM YYYY');
      this.displayDateOut = moment(dateOut).format('ddd, DD MMM YYYY');
      this.roomTypeData = resultArray;
      this.totalAmount = totalAmount;
      this.currentTotalAmount = this.totalAmount;
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
        'checkin_date': this.displayDateIn || null,
        'checkout_date': this.displayDateOut || null,
        'total_price': totalAmount || null,
      });
    } else {
      // Hiển thị thông báo lỗi
      alert("Không có dữ liệu trong sessionStorage");

      // Chuyển về trang trước đó
      window.history.back();
    }

    // Gán thông tin user nếu có đăng nhập
    if (Auth) {
      let user = Auth.User('user')
      console.log(user);
      this.userform.patchValue({
        'user_id': user.id,
        'guest_name': user.name,
        'guest_email': user.email,
        'guest_phone': user.phone_number,
      });

    } else {
      console.log('Chua dang nhap');
    }
    this.getHotel(hotelId);
  }

  // Lấy dữ liệu khách sạn
  getHotel(id: any) { // Lấy giá trị ID từ URL
    this.HotelClientService.findOne(id).subscribe({

      next: (res) => {
        console.log(res);

        this.hotels = res.data;
        this.hotel_name = res.data[0].hotel_name;
        this.hotelRoomTypeData = res.data[0].room_type;
      },
      error: (err) => {
        {
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }
      }
    });
  }

  // Kiểm tra đăng nhập (nếu không đăng nhập thì không có mã giảm)
  async checkLogin() {
    let userLogged: any = sessionStorage.getItem('user');
    let user = JSON.parse(userLogged);
    if (user) {
      this.notLogin = false;
      this.getCoupons();
    } else {
      console.log('Không đăng nhập');

    }
  }

  // Lấy dữ liệu mã giảm
  getCoupons() {
    let obs = this.CouponClientService.getCoupons().subscribe({
      next: (res) => {
        this.coupons = res.data;
        console.log(this.coupons)
      },
      error: (err) => {
        {
          this.message.create(ERROR, err.message);
        }
      }
    })
    this.subscription.add(obs);
  }

  // Hiển thị dữ liệu items (room type)
  get items(): FormArray {
    return this.userform.get('items') as FormArray;
  }

  // Thêm mới Booking
  async onSubmit() {
    const formValue = this.userform.value;
    if (this.userform.valid) {
      // Xử lý khi form hợp lệ
      console.log(formValue);
      this.confirmationService.confirm({
        message: 'Bạn có chắc chắn thông tin đã đúng chứ?',
        accept: async () => {
          let newData = this.userform.value;
          let create = this.BookingClientService.createBooking(newData);
          await create.subscribe({
            next: (res) => {
              console.log(res);
              this.resData = res.data;
              sessionStorage.setItem('hotel_Id', this.hotel_Id.toString());
              sessionStorage.setItem('resData', JSON.stringify(this.resData));
              sessionStorage.setItem('roomTypeArray', JSON.stringify(this.roomTypeData));
              sessionStorage.setItem('totalAmount', res.data.total_price.toString());
              if (this.selectedCouponId) {
                sessionStorage.setItem('discountAmount', this.discountAmount.toString());
                sessionStorage.setItem('CouponId', this.selectedCouponId.toString());
              }

              this.message.create(SUCCESS, `Đăng ký thành công!`);
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
      this.messageService.add({ severity: 'warn', summary: 'Cảnh báo', detail: 'Bạn chưa nhập đủ thông tin' });
    }
  }

  // Tính toán số tiền sau khi nhập mã giảm
  calculateTotalPrice(couponValue: number, couponType: string, maxDiscount: number): number {
    let finalPrice = this.totalAmount;

    if (couponType === 'percent') {
      this.discountAmount = (couponValue / 100) * this.totalAmount;
      if (this.discountAmount > maxDiscount) {
        this.discountAmount = maxDiscount;
      }
      finalPrice = this.totalAmount - this.discountAmount;
    } else if (couponType === 'value') {
      this.discountAmount = couponValue;
      finalPrice = this.totalAmount - this.discountAmount;
    }

    return finalPrice;
  }

  // Hiển thị input để nhập mã giảm giá khi nhấn nút "Áp dụng mã giảm giá"
  showCouponInput() {
    this.showCouponInputFlag = true;
    this.showBtnApply = false;
  }

  // Hủy input mã giảm giá và hiển thị lại nút "Áp dụng mã giảm giá"
  cancelCouponInput() {
    this.showCouponInputFlag = false;
    this.showBtnApply = true;
    this.couponCode = '';
  }

  async checkCoupon(couponCode: any) {
    if (couponCode) {
      this.confirmationService.confirm({
        message: 'Bạn có chắc chắn dùng mã giảm giá này?',
        accept: async () => {
          await this.CouponClientService.findByCode(couponCode).subscribe({
            next: (res) => {
              console.log(res);
              if (this.hotel_Id == res.data.hotel_id || res.data.end_date === this.now) {
                this.selectedCoupon = res.data;
                this.selectedCouponId = res.data.id;
                this.currentTotalAmount = this.calculateTotalPrice(res.data.value, res.data.type, res.data.max);
                this.showCouponInputFlag = false;
                this.userform.patchValue({
                  'coupon_id': this.selectedCouponId,
                  'total_price': this.currentTotalAmount || null,
                });
                this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Oke luông (●´ω｀●)' });
              } else {
                this.messageService.add({ severity: 'warn', summary: 'Cảnh báo', detail: 'Mã không khả dụng (╥﹏╥)' });
              }

            },
            error: (err) => {
              {
                this.messageService.add({ severity: 'warn', summary: 'Cảnh báo', detail: 'Sai mã hoặc mã k tồn tại (╥﹏╥)' });
              }
            }
          });
        },
        reject: () => {
          // Xử lý khi nhấn No
          // Đóng confirm popup
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Cảnh báo', detail: 'Nhập mã vào rồi mới nhấn!' });
    }
  }



}
