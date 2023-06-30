import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhotoService } from 'src/services/photoservice.service';

interface Type {
  name: string;
  code: string;
}

@Component({
  selector: 'app-hotel-booking-room',
  templateUrl: './hotel-booking-room.component.html',
  styleUrls: ['./hotel-booking-room.component.scss'],
  providers: [PhotoService]
})
export class HotelBookingRoomComponent implements OnInit, OnDestroy {
  @Input()  value!: number | string;
  constructor(private photoService: PhotoService) { }
  ref: DynamicDialogRef | undefined;
  visible: boolean = false;

  images: any[];

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


  selectedType!: Type;
  types: Type[] = [];
  checked: boolean = false;


  showDialog() {
      this.visible = true;
  }

  ngOnInit() {
    this.types = [
      { name: 'Thành tiền', code: '1' },
      { name: '1 Đêm', code: '2' }
    ];
    this.photoService.getImages().then((images) => {
      this.images = images;
    });
  }
  // show() {
  //     this.ref = this.dialogService.open(ProductListDemo, {
  //         header: 'Select a Product',
  //         width: '70%',
  //         contentStyle: { overflow: 'auto' },
  //         baseZIndex: 10000,
  //         maximizable: true
  //     });

  //     this.ref.onClose.subscribe((product: Product) => {
  //         if (product) {
  //             this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
  //         }
  //     });

  //     this.ref.onMaximize.subscribe((value) => {
  //         this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
  //     });
  // }

  ngOnDestroy() {
      if (this.ref) {
          this.ref.close();
      }
  }
}
