import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, firstValueFrom } from 'rxjs';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';

@Component({
  selector: 'create-update-room-type',
  templateUrl: './create-update-room-type.component.html'
})
export class CreateUpdateRoomTypeComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  @Input() roomTypeId: any;
  @Input() displayCreateUpdateRoomType: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  formRoomType!: FormGroup;

  sessionUser:any = sessionStorage.getItem('user');
  user:any = JSON.parse(this.sessionUser);

  hotels: any[] = [];

  constructor(
    private fb: FormBuilder,
    private roomTypeService: RoomTypeService,
    private message: NzMessageService,
    private hotelsService: HotelsService
  ) { }

  async ngOnInit() {
    this.createFormBuildRoomType();
    this.getRoomTypeUpdate();
    this.getHotels();
  }

  private createFormBuildRoomType(){

    this.formRoomType = this.fb.group({
      hotel_id: [null, Validators.required],
      name: [null, Validators.required],
      price_per_night: [null, Validators.required],
      capacity: [null, Validators.required],
      description: []
    })
  }

  getHotels(){
    let obs = this.hotelsService.getHotels().subscribe({
      next: (res) => {
        this.hotels = res.data
      },
      error: (err) => {
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
    });

    this.subscription.add(obs);
  }

  getRoomTypeUpdate(){
    if(this.roomTypeId){
      let obs = this.roomTypeService.findOne(this.roomTypeId).subscribe({
        next: (res) => {
          let roomType = res.data;
          this.formRoomType.patchValue({
            ...roomType,
            hotel_id: roomType.hotel.id
          })
        },
        error: (err) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      });

      this.subscription.add(obs);
    }

  }

  async handleOk(){
    if(this.formRoomType.valid){
      let create = this.roomTypeService.createRoomType(this.formRoomType.value);
      let update = this.roomTypeService.updateRoomType(this.roomTypeId, this.formRoomType.value)
      let createUpdate = this.roomTypeId ? update : create;

      let obs = await createUpdate.subscribe({
        next: (res) => {
          this.closeModal.emit();
          this.message.create(SUCCESS, `Thêm mới thành công !`);
        },
        error: (err) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      });
      this.subscription.add(obs)
    }
  }

  handleCancel(){
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
