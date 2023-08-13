import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { CouponsService } from 'src/app/module/_mShared/service/coupons.service';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Auth } from 'src/app/auth/_aShared/auth.class';

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
  ) { }

  hotels: any[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.createFormBuildCoupon();
    this.getHotels();
    this.getValueFormUpdate();
  }

  private createFormBuildCoupon(){

    let hotelId = Auth.Hotel();

    this.formCoupon = this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      value: [null, Validators.required],
      min: [0, [Validators.required, Validators.min(0)]],
      max: [null],
      hotel_id: [hotelId],
      start_date: [null],
      end_date: [null],
      quantity: [null]
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
          this.formCoupon.patchValue(res.data);
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
    this.isLoading = true;
    let a = this.formCoupon.get('min')!;
    this.formCoupon.markAllAsTouched();
    console.log(a)
    if (this.formCoupon.invalid) return;

      let id = this.couponId;
      let newData = {
        name: this.formCoupon.value.name,
        type: this.formCoupon.value.type,
        value: this.formCoupon.value.value,
        min: +this.formCoupon.value.min,
        max: +this.formCoupon.value.max,
        hotel_id: this.formCoupon.value.hotel_id,
        start_date: this.formCoupon.value.start_date,
        end_date: this.formCoupon.value.end_date,
        quantity: +this.formCoupon.value.quantity,
      }


      let createUpdate = this.couponsService.createCoupon(newData);

      if(id){
        createUpdate = this.couponsService.updateCoupon(id,newData);
      }
      createUpdate.subscribe({
        next: (cou:any) => {
          this.isLoading = false;
          this.closeModal.emit();
          this.message.create(SUCCESS, `${id ? "Cập nhật" : "Thêm mới"} thành công`);
        },
        error: (err:any) => {
          this.isLoading = false;
          this.message.create(ERROR, err.error.message);
        }
      })
  }

  changeTypeCoupon(event:any){
    let type:any = event.target.value;
    if(type == "percent"){
      this.formCoupon.get('value')?.setValidators([Validators.min(0),Validators.max(100)])
    }else if(type == "value"){
      this.formCoupon.get('value')?.setValidators([Validators.min(0),Validators.max(1000000000)])
    }
  }


  handleCancel(){
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}

