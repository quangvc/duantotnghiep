import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription, firstValueFrom } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { AuthService } from 'src/app/auth/_aShared/service/auth.service';
import { GenderHelper } from 'src/shared/helpers/AuthHelper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthClientService } from '../../services/auth-client.service';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BookingClientService } from '../../services/bookingClient.service';
import * as moment from 'moment';
import { StatusHelper } from 'src/shared/helpers/BookingHelper';
import { Enum } from 'src/app/module/_mShared/service/static/enum.service';
import { StatusBookings } from 'src/app/module/_mShared/enum/enum';


@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  auth = Auth.User('user');
  logged: any
  notLogin: any
  userData: any = sessionStorage.getItem('user');
  user = JSON.parse(this.userData);
  data: any[] = [];
  showTable: boolean = false;
  cols: any[] = [];
  bookingDate: any;
  statusText: any;
  displayGender: any

  path: any
  hasPermisson: boolean;
  ltsGenders: any;
  selectedGender: number;

  searchCode: string;
  loading: boolean;
  displayBookingForm: boolean = false;
  displayCreateBooking: boolean = false;

  bookings: any[] = [];

  bookingFilters: any[] = [...this.bookings]

  role: any;

  tabs = [1, 2, 3];

  statusOptions: any[] = [{ text: "Tất cả", value: 0 }];

  bookingId: any;
  userForm: FormGroup;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private AuthClientService: AuthClientService,
    private bookingService: BookingClientService,
    private message: NzMessageService,
    private BookingClientService: BookingClientService,

  ) {
    this.selectedGender = 0; // hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
  }

  ngOnInit() {
    this.checkLogin();
    this.getValueFormUpdate()
    this.ltsGenders = GenderHelper.getAllGenderList();
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      gender: [null, Validators.required],
      avatar: [null],
    });
    this.getBookings();
    this.getOption();
  }

  onChangeGender(e: any) {
    console.log(e.value.value);
    this.userForm.setValue({
      gender: e.value.value
    });
  }

  getValueFormUpdate() {
    let userId = this.auth.id
    if (userId) {
      let obs = this.AuthClientService.getUser(userId).subscribe({
        next: (res) => {
          console.log(res);

          this.userForm.patchValue({
            name: res.data.name,
            email: res.data.email,
            phone_number: res.data.phone_number,
            gender: res.data.gender,
            avatar: res.data.avatar,
          });
          this.displayGender = GenderHelper.getGenderText(res.data.gender);
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }
      })

      this.subscription.add(obs);
    }
  }
  handleUpdate() {

    if (this.userForm.invalid) return;

    let id = this.auth.id;
    let newData = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone_number: this.userForm.value.phone_number,
      gender: this.userForm.value.gender.value,
      avatar: this.userForm.value.avatar,
    }
    console.log(newData);



    let Update = this.AuthClientService.Update(id, newData);
    Update.subscribe({
      next: (user: any) => {
        this.message.create(SUCCESS, `Cập nhật thành công`);
        this.hideDiv();
        this.getValueFormUpdate();
        // sessionStorage.setItem('user', user);
      },
      error: (err: any) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

  checkLogin() {
    let userLogged: any = sessionStorage.getItem('user');
    let user = JSON.parse(userLogged);

    if (user && user.role && user.role.length > 0) {
      if (user.role[0] === "client") {
        this.hasPermisson = false;
      } else {
        this.hasPermisson = true;
      }
    } else {
      // Xử lý khi giá trị không xác định
      // alert('User or role is undefined');
    }
  }

  confirmDialog() {
    this.confirmationService.confirm({
      message: 'Bạn có muốn đăng xuất?',
      accept: () => {
        this.logOut();
      },
      reject: () => {
        // Xử lý khi người dùng từ chối (Cancel)
        console.log('Người dùng từ chối');
      }
    });
  }

  async logOut() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.User().token}`
      })
    }
    await firstValueFrom(this.authService.createLogout(httpOptions));
    await sessionStorage.removeItem('user');
    this.router.navigate(['login'])
  }
  showButton2: boolean = false;
  showViewDiv: boolean = true;
  showEditDiv: boolean = false;
  showDiv() {
    this.showViewDiv = false;
    this.showEditDiv = true;
    this.showButton2 = true;
  }

  hideDiv() {
    this.showViewDiv = true;
    this.showEditDiv = false;
    this.showButton2 = false;
  }


  getBookings() {
    let user = Auth.User('user')
    console.log(user);

    this.BookingClientService.findByAcc(user.id).subscribe({
      next: (res) => {
        this.bookingFilters = res.data;
        console.log(this.bookingFilters)
        this.showTable = true;
        this.bookingDate = moment(res.data[0].booking_date).format('DD-MM-YYYY');
        this.convertTextStatus();

      },
      error: (err) => {
        this.showTable = true;
        this.data = [];
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
    });
  }

  getOption() {
    this.statusOptions.push(...Enum.convertEnum(StatusBookings));
  }

  convertTextStatus(){
    for (const booking of this.bookingFilters) {
      if(booking.status == StatusBookings.Unpaid){
        booking.txtStatus = "Chưa thanh toán"
      }
      if(booking.status == StatusBookings.Unconfirmed){
        booking.txtStatus = "Đang chờ duyệt"
      }
      if(booking.status == StatusBookings.Confirmed){
        booking.txtStatus = "Đã duyệt"
      }
      if(booking.status == StatusBookings.Using){
        booking.txtStatus = "Đang sử dụng"
      }
      if(booking.status == StatusBookings.Clean){
        booking.txtStatus = "Đang dọn dẹp"
      }
      if(booking.status == StatusBookings.Cancel){
        booking.txtStatus = "Đã hủy"
      }
      if(booking.status == StatusBookings.WaitingCancel){
        booking.txtStatus = "Đang chờ hủy"
      }
    }
  }

  eventSubmit(event: any) {
    this.displayBookingForm = false;
    // this.getBookings();
  }

  emitEvent(event: any) {
    this.displayCreateBooking = false;
    // this.getBookings();
  }
  updateStatus(value: any) {
    this.displayBookingForm = true;
    this.bookingId = value;
  }
}
