import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
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
      roomID: [null, Validators.required],
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
          // this.closeModal.emit();
          console.log(this.formGroup.value)
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

  async asignRoom(event:any,i:any){

    let roomID = event.target.value;
    let selectedRoom:any[] = [];
    // if(event){
    //   let room = await this.rooms.find(r => r.id == roomID);

    //   await this.selectedRoom.push(room);

    // }
    // console.log(this.formGroup.value);
    this.formGroup.value.items.forEach((value:any) => {
      // let uniq = value.filter((x:any) => x.roomID == roomID);
      if(value.roomID == roomID){
        selectedRoom.push(value);
      }

    });

    // if(selectedRoom.length > 1){
    //   this.message.create(ERROR, "Bạn đã đặt phòng này rồi");
    //   (this.formGroup.controls['items'] as FormGroup).controls[i].reset();
    // }

  }

  save(){
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
