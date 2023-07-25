import { UserService } from './../../../_mShared/service/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';

@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Input() displayPermision: boolean;
  @Input() userID: any;
  @Input() hotelID: any;
  @Input() Urole: any[] = [];
  @Output() closeUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private hotelService: HotelsService,
    private userService: UserService,
    private fb: FormBuilder,
    private message: NzMessageService,

  ) { }

  isLoading: boolean = false;

  formPermision!: FormGroup;

  hotels: any[] = [];

  ngOnInit() {
    this.createFormBuilder();
    this.getHotel();
    this.getOption();
  }

  private createFormBuilder(){
    this.formPermision = this.fb.group({
      role: [],
      hotel_id: ["", Validators.required]
    })
  }

  getOption(){
    this.formPermision.get('hotel_id')?.patchValue(String(this.hotelID));
  }

  getHotel(){
    this.hotelService.getHotels().subscribe({
      next: (res) => {
        this.hotels = res.data;
      }
    })
  }


  async save(){

    this.formPermision.markAsTouched();
    if(this.formPermision.invalid) return;

    this.isLoading = true;

    // Phân quyền cho người dùng
    await this.userService.changeRole(this.userID, {role: this.formPermision.value.role}).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `Cập nhật người dùng thành công.`)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })

    let data = {
      hotel_id: this.formPermision.value.hotel_id
    };

    // Cập nhật khách sạn cho người dùng
    await this.userService.updateUser(data, this.userID).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message.create(SUCCESS, `SUCCESS, Assign hotel for User`);
        this.closeUser.emit();
      },
      error: (err) => {
        this.isLoading = false;
        this.message.create(ERROR, err.error.message);
      }
    })



  }

  cancel(){
    this.closeUser.emit();
  }

}
