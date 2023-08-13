import { NzMessageService } from 'ng-zorro-antd/message';
import { PhotoService } from '../../../../services/photoservice.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { ImagesClientService } from 'src/app/main-global/services/images-client.service';

interface RoomTypeDetailData {
  id: number;
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
  private subscription = new Subscription();
  constructor(private imagesClientService: ImagesClientService,private message: NzMessageService,) { }
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

  // http://127.0.0.1:8000/api/client/image/room-type/1

  ngOnInit() {
    // this.getImages()
  }
  visible: boolean = false;

  getImages(data: any){
    console.log(data);

    let obs = this.imagesClientService.getImagesRoomType(data.id).subscribe({
      next: (res) => {
        console.log(res.data)
        this.images = res.data;
      },
      error: (err) => {{
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }


  open(roomType: any) {
    this.roomType = roomType;
    this.getImages(roomType)
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
