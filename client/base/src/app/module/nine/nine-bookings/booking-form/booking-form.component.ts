import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { BookingsService } from 'src/app/module/_mShared/service/bookings.service';
import { RoomsService } from 'src/app/module/_mShared/service/rooms.service';

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
    private roomService: RoomsService,
    private fb: FormBuilder
  ) { }


  confirmModal?: NzModalRef;

  formGroup!: FormGroup;

  booking: any[] = [];
  booking_details: any[] = [];

  rooms: any[] = [];

  displayXepPhong: boolean = false;
  room: any;

  get roomItems() : FormArray {
    return this.formGroup.get("items") as FormArray;
  }

  ngOnInit() {
    this.createFormArray();
    this.getDetail();
    this.getRooms();
  }

  private createFormArray(){
    this.formGroup = this.fb.group({
      items: this.fb.array([])
    });
  }

  newRoom(detailRoom:any): FormGroup {
    return this.fb.group({
      room: [],
      room_type_id: [detailRoom.room_type_id],
      room_id: [detailRoom.room_id, Validators.required],
      room_type: [detailRoom],
    })
  }

  addItem(detailRoom: any) {
    const items = this.formGroup.get('items') as FormArray;

    this.roomItems.push(this.newRoom(detailRoom));
  }

  getDetail(){
    this.bookingsService.findOne(this.bookingId).subscribe({
      next: (res) => {
        this.booking = res.data;
        this.booking_details = this.booking[0].booking_details;
        this.booking_details.forEach(d => {
          this.addItem(d)
        });
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
        this.message.create(ERROR, err.message);
      }
    })
  }

  getBookingDetail(){

  }

  getRooms(){
    this.roomService.getRooms().subscribe({
      next: (res) => {
        this.rooms = res.data;
      }
    })
  }

  handleOk(){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác nhận thay đổi?`,
      nzContent: 'Bạn có muốn lưu thay đổi không?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.save();
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
          // this.closeModal.emit();
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  async save(){

    this.formGroup.markAsTouched();
    if(this.formGroup.invalid) return;

    let data:any[] = [];

    await this.formGroup.value.items.forEach((element:any) => {
      let item = {
        room_type_id: element.room_type_id,
        room_id: [Number(element.room_id)]
      }
      data.push(item);
    });

    let groupedData = await data.reduce((acc, item) => {
      const existingItem = acc.find((i:any) => i.room_type_id === item.room_type_id);
      if (existingItem) {
          existingItem.room_id.push(...item.room_id);
      } else {
          acc.push({ room_type_id: item.room_type_id, room_id: item.room_id });
      }
      return acc;
    }, []);

    this.bookingsService.confirmBooking(this.bookingId, groupedData).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, "Xếp phòng thành công");
        this.closeModal.emit();
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
        console.log(err)
      }
    })
  }

  // roomList(data:any){
  //   this.displayXepPhong = true;
  //   this.room = data;
  // }

  cancelModal(event: any){
    this.displayXepPhong = false;
  }

  handleCancel(){
    this.closeModal.emit();
  }

}
