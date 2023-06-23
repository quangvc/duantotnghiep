import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { CouponsService } from 'src/app/module/_mShared/service/coupons.service';
import { NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'create-update-coupon',
  templateUrl: './create-update-coupon.component.html',
})
export class CreateUpdateCouponComponent implements OnInit, OnDestroy {
  date = null;
  private subscription = new Subscription();

  @Input() couponId: any;
  @Input() displayCreateUpdateCoupon: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  formCoupon!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private couponsService: CouponsService,
    private hotelsService: HotelsService,
    private message: NzMessageService,
    private i18n: NzI18nService
  ) { }

  hotels: any[] = [];

  ngOnInit() {
    this.createFormBuildCoupon();
    this.getHotels();
    this.getValueFormUpdate();
  }

  private createFormBuildCoupon(){
    this.formCoupon = this.fb.group({
      coupon_name: [null, Validators.required],
      coupon_type: [null, Validators.required],
      coupon_value: [null, Validators.required],
      coupon_min: [null, Validators.required],
      coupon_max: [null],
      hotel_id: [null],
      coupon_dateStart: [null],
      coupon_dateEnd: [null],
    })
  }

  getHotels(){
    let obs = this.hotelsService.getHotels().subscribe({
      next: (hotel) => {
        this.hotels = hotel.data;
        console.log(hotel)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })

    this.subscription.add(obs);
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getValueFormUpdate(){
    if(this.couponId){
      let obs = this.couponsService.findOne(this.couponId).subscribe({
        next: (res) => {
          this.formCoupon.patchValue({
            coupon_name: res.data.name,
            coupon_type: res.data.type,
            coupon_value: res.data.value,
            coupon_min: res.data.min,
            coupon_max: res.data.max,
            hotel_id: res.data.hotel.id,
            coupon_dateStart: res.data.dateStart,
            coupon_dateEnd: res.data.dateEnd,
          });
          console.log(res)
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }
      })
      this.subscription.add(obs);
    }
  }

  handleOk(){
    if(this.formCoupon.valid){
      let id = this.couponId;
      let newData = {
        name: this.formCoupon.value.coupon_name,
        type: this.formCoupon.value.coupon_type,
        value: this.formCoupon.value.coupon_value,
        min: this.formCoupon.value.coupon_min,
        max: this.formCoupon.value.coupon_max,
        hotel_id: this.formCoupon.value.hotel_id,
        dateStart: this.formCoupon.value.coupon_dateStart,
        dateEnd: this.formCoupon.value.coupon_dateEnd,
        quantity: 12
      }
      let formData = new FormData();

      formData.append('name', this.formCoupon.value.coupon_name);
      formData.append('type', this.formCoupon.value.coupon_type);
      formData.append('value', this.formCoupon.value.coupon_value);
      formData.append('min', this.formCoupon.value.coupon_min);
      formData.append('max', this.formCoupon.value.coupon_max);
      formData.append('hotel_id', this.formCoupon.value.hotel_id);
      formData.append('dateStart', this.formCoupon.value.coupon_dateStart);
      formData.append('dateEnd', this.formCoupon.value.coupon_dateEnd);
      formData.append('quantity', String(12));

      let createUpdate = this.couponsService.createCoupon(formData);

      if(id){
        createUpdate = this.couponsService.updateCoupon(id,newData);
      }
      createUpdate.subscribe({
        next: (cou:any) => {
          console.log(cou);
          this.closeModal.emit();
          this.message.create(SUCCESS, `${id ? "Cập nhật" : "Thêm mới"} thành công`);
        },
        error: (err:any) => {
          this.message.create(ERROR, err.error.message);
          console.log(err);
        }
      })
    }
  }


  handleCancel(){
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}

