import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomsService } from 'src/app/module/_mShared/service/rooms.service';

@Component({
  selector: 'xep-phong',
  templateUrl: './xep-phong.component.html',
  styleUrls: ['./xep-phong.component.scss']
})
export class XepPhongComponent implements OnInit {

  @Input() displayXepPhong: boolean;
  @Input() room: any;
  @Output() closeModal = new EventEmitter<any>();

  constructor(private roomService: RoomsService) { }

  listRoom: any[] = []

  bookingRoom: any[] = [];

  ngOnInit() {
    this.getRooms();
  }

  getRooms(){
    this.roomService.getRooms().subscribe({
      next: (res) => {
        this.listRoom = res.data;
        this.listRoom = this.listRoom.filter(r => r.room_type.id == this.room.room_type.id);
        console.log(this.listRoom)
      }
    })
  }

  handleOk(){
    console.log(this.room)
  }

  async chooseRoom(room:any){
    await this.bookingRoom.push(room);
    this.listRoom = this.listRoom.filter(r => r.id != room.id);
  }

  handleCancel(){
    this.closeModal.emit();
  }

}
