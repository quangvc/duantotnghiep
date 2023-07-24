import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { BookingsService } from 'src/app/module/_mShared/service/bookings.service';

@Component({
  selector: 'booking-form',
  templateUrl: './booking-form.component.html'
})
export class BookingFormComponent implements OnInit {

  @Input() bookingId: any;
  @Input() displayBookingForm: boolean;
  @Output() closeModal = new EventEmitter<any>();

  constructor(
    private bookingsService: BookingsService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }


  confirmModal?: NzModalRef;


  booking: any[] = []

  ngOnInit() {
    this.getDetail();
  }

  getDetail(){
    this.bookingsService.findOne(this.bookingId).subscribe({
      next: (res) => {
        this.booking = res.data;
        console.log(this.booking)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
        this.message.create(ERROR, err.message);
      }
    })
  }

  handleOk(){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác nhận thay đổi?`,
      nzContent: 'Bạn có muốn lưu thay đổi không?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.closeModal.emit();
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  refuseCancel(){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác nhận thay đổi?`,
      nzContent: 'Bạn có muốn hủy đơn hàng này?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.closeModal.emit();
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  handleCancel(){
    this.closeModal.emit();
  }

}
