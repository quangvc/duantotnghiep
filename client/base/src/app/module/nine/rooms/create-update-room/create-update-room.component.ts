import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';
import { RoomsService } from 'src/app/module/_mShared/service/rooms.service';

@Component({
  selector: 'create-update-room',
  templateUrl: './create-update-room.component.html'
})
export class CreateUpdateRoomComponent implements OnInit, OnDestroy {

  @Input() displayCreateUpdateRoom: boolean = false;
  @Input() room: any;
  @Output() closeModal = new EventEmitter<any>();

  private subscription = new Subscription();

  formRoom!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private roomTypeService: RoomTypeService,
    private hotelsService: HotelsService,
    private roomsService: RoomsService
  ) { }

  roomTypes: any[] = [];
  hotels: any[] = [];

  ngOnInit() {
    this.createFormRoom();
    this.getHotels();
    this.getRoomTypes();
    this.getRoom();
  }

  private createFormRoom(){
    this.formRoom = this.fb.group({
      id: Math.floor(Math.random() * 999999),
      hotel_id: [null,Validators.required],
      room_type_id: [null,Validators.required],
      room_number: [null,Validators.required],
      status: [-1]
    })
  }

  getRoom(){
    if(this.room){
      this.formRoom.patchValue(this.room);
    }
  }

  getHotels(){
    let obs = this.hotelsService.getHotels().subscribe({
      next: (hotel) => {
        this.hotels = hotel;
      },
      error: (err) => {
        alert(err)
      }
    })

    this.subscription.add(obs);
  }

  getRoomTypes(){
    let obs = this.roomTypeService.getRoomType().subscribe({
      next: (roomType) => {
        this.roomTypes = roomType;
      },
      error: (err) => {
        alert(err)
      }
    })

    this.subscription.add(obs);

  }

  handleOk(){
    if(this.formRoom.valid){
      let create = this.roomsService.createRoom(this.formRoom.value);
      let update:any;
      if(this.room){
        update = this.roomsService.updateRoom(this.room.id,this.formRoom.value);
      }

      let createUpdate = this.room ? update : create;

      createUpdate.subscribe({
        next: (room:any) => {
          this.closeModal.emit();
        },
        error: (err:any) => {
          alert(err);
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
