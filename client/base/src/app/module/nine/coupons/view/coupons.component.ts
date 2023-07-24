import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { NineStatus } from 'src/app/module/_mShared/enum/enum';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { Enum } from 'src/app/module/_mShared/service/static/enum.service';


import { CouponsService } from 'src/app/module/_mShared/service/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  private subscription = new Subscription();

  displayCreateUpdateCoupon: boolean = false;

  constructor(
    private CouponsService: CouponsService,
    private message: NzMessageService,
    private modal: NzModalService
    ) { }

  coupons: any[] = [];
  couponId: any;
  menus: MenuItem[] = [];
  statusOption: any;

  confirmModal?: NzModalRef;

  ngOnInit() {
    this.getCoupons();
    this.getOptionEnum();
  }

  getOptionEnum(){
    this.statusOption = Enum.convertEnum(NineStatus);
  }

  getCoupons(){
    let obs = this.CouponsService.getCoupons().subscribe({
      next: (res) => {
        this.coupons = res.data;
        console.log(res)
      },
      error: (err) => {{
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }

  dropdownItemsButton(data:any){
    this.menus = [
      {
        label: "Chỉnh sửa",
        command: () => {
          this.editCoupon(data);
        },
      },
      { separator: true},
      {
        label: "Xóa",
        command: () => {
          this.showConfirm(data);
        },
      },
    ]
  }

  addCoupon(){
    this.displayCreateUpdateCoupon = true;
    this.couponId = null;
  }

  editCoupon(coupon:any){
    this.displayCreateUpdateCoupon = true;
    this.couponId = coupon.id;
  };

  cancel(event:any){
    this.displayCreateUpdateCoupon = false;
    this.getCoupons();
  }

  showConfirm(data:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to delete ${data.name} ?`,
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteCoupon(data);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  deleteCoupon(data:any){
    this.CouponsService.deleteCoupon(data.id).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `Xóa ${data.name} thành công.`)
        this.getCoupons();
      },
      error: (err) => {
        this.message.create(ERROR, `${err.message}`)
      }
    })
  }

  }

