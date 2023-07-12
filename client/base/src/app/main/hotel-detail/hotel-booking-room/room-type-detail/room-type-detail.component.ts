import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { RoomTypeService } from 'src/app/module/_mShared/service/room_type.service';
import { PhotoService } from 'src/app/services/photoservice.service';

@Component({
  selector: 'room-type-detail',
  templateUrl: './room-type-detail.component.html',
  styleUrls: ['./room-type-detail.component.scss']
})
export class RoomTypeDetailComponent implements OnInit {
  constructor(private photoService: PhotoService, private roomTypeService: RoomTypeService,) { }
  @Input() roomTypeId: any;
  @Input() displayRoomType: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

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
    this.showModal()
  }

  showModal() {
    if (this.roomTypeId) {
      this.roomTypeService.findOne(this.roomTypeId).subscribe({

        next: (res) => {
          console.log(res);

          this.roomType = res.data;
        },
        error: (err) => {
          {
            console.log('Đã xảy ra lỗi khi gọi API:', err);
          }
        }
      });
    } else {
      alert("Địt mẹ ảo thật đấy")
    }
  }

  handleCancel() {
    if (!this.displayRoomType) {
      console.log('closing');
      this.closeModal.emit();
    }
  }

}
