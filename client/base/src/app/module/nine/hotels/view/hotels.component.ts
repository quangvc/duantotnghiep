import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  displayCreateUpdateHotel: boolean = false;

  constructor() { }

  hotels: any[] = [];

  ngOnInit() {
  }

  addHotel(){
    this.displayCreateUpdateHotel = true;
  }

  cancel(event:any){
    this.displayCreateUpdateHotel = false;
  }

}
