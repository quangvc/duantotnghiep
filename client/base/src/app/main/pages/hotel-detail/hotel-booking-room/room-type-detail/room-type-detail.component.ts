import { PhotoService } from './../../../../services/photoservice.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

interface RoomTypeDetailData {
  name: string;
  capacity: number;
  price_per_night: number;
}

@Component({
  selector: 'room-type-detail',
  templateUrl: './room-type-detail.component.html',
  styleUrls: ['./room-type-detail.component.scss']
})
export class RoomTypeDetailComponent implements OnInit {
  constructor(private PhotoService: PhotoService) { }
  @Input() displayRoomType: boolean = false;
  @Output() closeModal = new EventEmitter<any>();
  @Input() roomTypeDetailData: RoomTypeDetailData;

  ref: DynamicDialogRef | undefined;
  images: any[];
  checked: boolean = false;
  roomType: any;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  ngOnInit() {
    // this.showModal()
  }
  visible: boolean = false;

  open(roomType: any) {
    this.roomType = roomType;
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
