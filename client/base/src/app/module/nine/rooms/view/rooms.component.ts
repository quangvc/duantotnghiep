import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  displayCreateUpdateRoom: boolean = false;

  constructor() { }

  rooms: any[] = [];

  ngOnInit() {
  }

  addRoom(){
    this.displayCreateUpdateRoom = true;
  }

  cancel(event:any){
    this.displayCreateUpdateRoom = false;
  }

}
