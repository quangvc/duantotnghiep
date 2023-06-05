import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.scss']
})
export class RoomTypesComponent implements OnInit {

  displayCreateUpdateRoomType: boolean = false;

  constructor() { }

  roomTypes:any[] = [];

  ngOnInit() {
  }

  addRoomType(){
    this.displayCreateUpdateRoomType = true;
  }

  cancel(event:any){
    this.displayCreateUpdateRoomType = false;
  }

}
