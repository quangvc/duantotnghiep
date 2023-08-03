import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, firstValueFrom } from 'rxjs';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { ImagesService } from 'src/app/module/_mShared/service/images.service';
import { RegionsService } from 'src/app/module/_mShared/service/regions.service';

@Component({
  selector: 'create-update-hotel',
  templateUrl: './create-update-hotel.component.html',
})
export class AddHotelComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  @Input() hotelId: any;
  @Input() displayCreateUpdateHotel: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  formHotel!: FormGroup;

  role:any;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private regionsService: RegionsService,
    private hotelsService: HotelsService,
    private message: NzMessageService
  ) {}

  regionOptions: any[] = [];

  ngOnInit() {
    this.createFormBuildHotel();
    this.getRegion();
    this.getValueFormUpdate();


  }

  private createFormBuildHotel() {
    this.formHotel = this.fb.group({
      hotel_name: [null, Validators.required],
      hotel_address: [null, Validators.required],
      hotel_phone: [null, Validators.required],
      region_id: [, Validators.required],
      star_rating: [5],
      description: [null],
      status: [1],
    });
  }

  getRegion() {
    let obs = this.regionsService.getRegions().subscribe({
      next: (res) => {
        this.regionOptions = res.data;
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      },
    });

    this.subscription.add(obs);
  }

  getValueFormUpdate() {
    if (this.hotelId) {
      let obs = this.hotelsService.findOne(this.hotelId).subscribe({
        next: (res) => {
          this.formHotel.patchValue(res.data);
          console.log(res);
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        },
      });
      this.subscription.add(obs);
    }
  }

  filetest: any;

  async onSelectFile(event: any) {
    const formData = new FormData();
    if (event.target.files.length > 0) {
      let file: any = await event.target.files[0];
    } else {
    }
  }

  async handleOk() {
    this.isLoading = true;
    if (this.formHotel.valid) {

      let id = this.hotelId;
      const formData = new FormData();

      if (id) {
        let update = this.hotelsService.updateHotel(id,this.formHotel.value);
        await update.subscribe({
          next: (res) => {
            this.isLoading = false;
            this.closeModal.emit();
            this.message.create(SUCCESS, `Cập nhật thành công!`);
          },
          error: (err) => {
            this.isLoading = false;
            this.message.create(ERROR, err.error.message);
          }
        })
      }else{
        let newData = {
          ...this.formHotel.value,
          hotel_phone: String(this.formHotel.value.hotel_phone)
        }
        let create = this.hotelsService.createHotel(newData);
        await create.subscribe({
          next: (res) => {
            this.isLoading = false;
            this.closeModal.emit();
            this.message.create(SUCCESS, `Thêm mới thành công!`);
          },
          error: (err) => {
            this.isLoading = false;
            this.message.create(ERROR, err.error.message);
          }
        })


        // let hotels:any[] = await firstValueFrom(this.hotelsService.getHotels());
        // let hotel:any = hotels.find()

        // if (file) {
        //   await this.imagesService.addImage( formData).subscribe({
        //     next: (res) => {},
        //     error: (err) => {
        //       this.message.create(ERROR, err.error.message);
        //     },
        //   });
        // }
      }

    }
  }

  handleCancel() {
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
