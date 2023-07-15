import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';
import { RoomsService } from 'src/app/module/_mShared/service/rooms.service';

@Component({
  selector: 'create-update-room',
  templateUrl: './create-update-room.component.html'
})
export class CreateUpdateRoomComponent implements OnInit, OnDestroy {

  @Input() displayCreateUpdateRoom: boolean = false;
  @Input() roomId: any;
  @Output() closeModal = new EventEmitter<any>();

  private subscription = new Subscription();

  formRoom!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private roomTypeService: RoomTypeService,
    private hotelsService: HotelsService,
    private roomsService: RoomsService,
    private message: NzMessageService
  ) { }

  roomTypes: any[] = [];
  roomTypesFilter: any[] = [...this.roomTypes];
  hotels: any[] = [];

  ngOnInit() {
    this.createFormRoom();
    // this.getHotels();
    this.getRoomTypes();
    this.getRoom();
  }

  private createFormRoom(){
    this.formRoom = this.fb.group({
      room_type_id: [null,Validators.required],
      room_number: [null,Validators.required],
      status: [1]
    })
  }

  getRoom(){
    if(this.roomId){
      this.roomsService.findOne(this.roomId).subscribe({
        next: (res) => {
          let room = res.data;
          this.formRoom.patchValue({
            room_type_id: room.room_type.id,
            room_number: room.room_number
          });
        },
        error: (err) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      })
    }
  }

  getRoomTypes(){
    let obs = this.roomTypeService.getRoomTypes().subscribe({
      next: (roomType) => {
        this.roomTypes = roomType.data;
        let hotelId = Auth.Hotel();

        if(hotelId){
          this.roomTypesFilter = this.roomTypes.filter(rm => rm.hotel.id == hotelId);
        }else{
          this.roomTypesFilter = roomType.data;
        }
      },
      error: (err) => {
        this.message.create(ERROR, `${err.error.message}`)
        this.message.create(ERROR, `${err.message}`)
      }
    })

    this.subscription.add(obs);

  }

  handleOk(){
    if(this.formRoom.valid){
      let id = this.roomId;
      let newData = {
        ...this.formRoom.value,
        room_number: String(this.formRoom.value.room_number)
      }
      let createUpdate = this.roomsService.createRoom(newData);

      if(id){
        createUpdate = this.roomsService.updateRoom(id,newData);
      }

      createUpdate.subscribe({
        next: (room:any) => {
          this.closeModal.emit();
          this.message.create(SUCCESS, `${id ? "Cập nhật" : "Thêm mới"} thành công`);
        },
        error: (err:any) => {
          this.message.create(ERROR, `${err.error.message}`)
          this.message.create(ERROR, `${err.message}`)
        }
      })
    }
  }

  // async changeHotel(event:any){
  //   let hotelId = event.target.value;
  //   this.roomTypesFilter = await this.roomTypes.filter(rt => rt.hotel.id == hotelId);
  // }

  handleCancel(){
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
