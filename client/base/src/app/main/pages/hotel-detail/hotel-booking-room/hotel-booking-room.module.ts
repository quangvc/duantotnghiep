import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ImagesClientService } from '../../../services/images-client.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [DialogService, ImagesClientService],
})
export class HotelBookingRoomModule { }
