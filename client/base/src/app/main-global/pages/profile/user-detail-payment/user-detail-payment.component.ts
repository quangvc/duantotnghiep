import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { BookingClientService } from 'src/app/main-global/services/bookingClient.service';
import { RoomClientService } from 'src/app/main-global/services/room-client.service';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { BookingsService } from 'src/app/module/_mShared/service/bookings.service';

interface Hotel {
  id: number;
  hotel_name: string;
}

interface RoomType {
  id: number;
  hotel_id: number;
  name: string;
  hotel: Hotel;
}

interface BookingDetail {
  id: number;
  booking_id: number;
  room_type_id: number;
  room_id: number | null;
  room_type: RoomType;
  count?: number;
}
@Component({
  selector: 'user-detail-payment',
  templateUrl: './user-detail-payment.component.html',
  styleUrls: ['./user-detail-payment.component.scss'],
})
export class UserDetailPaymentComponent implements OnInit {
  @Input() bookingId: any;
  @Input() displayBookingForm: boolean;
  @Output() closeModal = new EventEmitter<any>();

  constructor(
    private bookingsService: BookingClientService,
    // private bookingsService: BookingsService,
    private modal: NzModalService,
    private message: NzMessageService,
    private roomService: RoomClientService
  ) {}

  confirmModal?: NzModalRef;

  booking: any[] = [];
  booking_details: BookingDetail[] = [];
  booking_status: any;
  rooms: any[] = [];
  enteredBookingCode: string = '';
  isConfirmLoading = false;

  ngOnInit() {
    this.getDetail();
    this.getRooms();
  }

  getDetail() {
    this.bookingsService.findOne(this.bookingId).subscribe({
      next: (res) => {
        console.log(res);

        this.booking = res.data;
        this.booking_details = this.booking[0].booking_details;
        this.booking_status = this.booking[0].status;
        console.log(this.booking_details);
        console.log(this.booking_status);
        this.processBookingDetails();
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
        this.message.create(ERROR, err.message);
      },
    });
  }

  processBookingDetails() {
    const mergedBookingDetails: BookingDetail[] = this.booking_details.reduce(
      (acc, cur) => {
        const existingEntry = acc.find(
          (entry) => entry.room_type_id === cur.room_type_id
        );
        if (existingEntry) {
          existingEntry.count! += 1;
        } else {
          acc.push({ ...cur, count: 1 });
        }
        return acc;
      },
      [] as BookingDetail[]
    );

    this.booking_details = mergedBookingDetails;
  }

  getRooms() {
    this.roomService.getRooms().subscribe({
      next: (res) => {
        console.log(res);
        this.rooms = res.data;
      },
    });
  }

  showCancelConfirmationModal(): void {
    this.modal.create({
      nzTitle: 'Xác nhận hủy phòng',
      nzContent: `
      <div class="text-center">
        <h4>Bạn có thực sự muốn hủy đơn hay không?</h4>
        <p style="color:red;" class="fst-italic">*Đơn đặt chỉ được hủy trước 7 ngày tính từ ngày checkin</p>
      </div>
      `,
      nzOkText: 'Xác nhận',
      nzCancelText: 'Hủy',
      nzOnOk: () => this.cancelBooking(),
      nzOnCancel: () => {
        // Optionally, you can reset the enteredBookingCode if the user cancels
        this.enteredBookingCode = '';
      },
    });
  }

  cancelBooking() {
    // Check if the entered booking code matches the actual booking code
    // if (this.enteredBookingCode !== this.booking[0].booking_number) {
    //   this.message.error('Mã đơn không trùng khớp. Hủy đơn không thành công.');
    //   return;
    // }

    // If the booking code matches, proceed with canceling the booking
    this.bookingsService.cancelBooking(this.bookingId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.length > 0) {
          this.message.create(ERROR, res);
        } else {
          this.message.create(SUCCESS, res.message);
        }

        this.isConfirmLoading = true;
        setTimeout(() => {
          this.isConfirmLoading = false;
          this.closeModal.emit();
        }, 1000);
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
        this.message.create(ERROR, err.message);
      },
    });
  }

  handleCancel() {
    this.closeModal.emit();
  }
}
