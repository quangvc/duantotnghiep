import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'src/app/module/_mShared/model/menuItem.class';
import { PhotoService } from '../../../services/photoservice.service';
import { RoomTypeDetailComponent } from './room-type-detail/room-type-detail.component';
import { roomTypeClientService } from 'src/app/main/services/room-type-client.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, WARNING } from 'src/app/module/_mShared/model/url.class';
import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';

interface roomType {
  hotel_id: number;
  name: string;
  price_per_night: number;
  capacity: number;
  description: string;
  selectedRoom: any;
}

@Component({
  selector: 'app-hotel-booking-room',
  templateUrl: './hotel-booking-room.component.html',
  styleUrls: ['./hotel-booking-room.component.scss'],
  providers: [PhotoService]
})
export class HotelBookingRoomComponent implements OnInit {
  @Input('hotelRoomTypeData') RoomTypeData: any[] = [];
  @Input() hotel_id: any;
  @Input() hotel_name: any;
  @ViewChild('dialog') dialog: RoomTypeDetailComponent;
  rangeDates: Date[] = [];

  firstTable: boolean = true;
  dataTable: boolean = false;

  roomTypeselect: any

  roomType: any;
  selectedImage: string;
  hotelId: any;
  date_in: string = ''; // Ngày check-in
  date_out: string = ''; // Ngày check-out
  visible: boolean = false; // Biến để ẩn/hiện phần lọc
  ReadMore: boolean = true; // Biến để thay đổi nút xem thêm/ẩn bộ lọc
  selectedRoomType!: roomType;
  menus: MenuItem[] = [];
  roomTypeDisplay: boolean[] = [];
  roomTypes: roomType[];
  selectedQuantity: string;
  total: number = 0;
  selectedRow: any;
  minimumDate: Date;

  totalQuantity: any;
  totalPrice: any;
  totalAmount: any;
  resultArray: any[] = []; // Mảng lưu trữ kết quả tính toán

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

  constructor(
    private roomTypeClientService: roomTypeClientService,
    private message: NzMessageService,
  ) {
    // Tạo ngày hiện tại
    const currentDate = moment();

    // Thêm 1 ngày vào ngày hiện tại
    const nextDay = currentDate.add(1, 'days');

    // Lưu giá trị vào biến minimumDate
    this.minimumDate = nextDay.toDate();
  }
  private subscription = new Subscription();

  ngOnInit() {
    // Kiểm tra xem có tồn tại các trường checkinDate và checkoutDate trong sessionStorage hay không
    const checkinDate = sessionStorage.getItem('checkinDate');
    const checkoutDate = sessionStorage.getItem('checkoutDate');

    if (checkinDate && checkoutDate) {
      this.visible = true;
      // Nếu tồn tại, gán giá trị vào biến date_in và date_out
      this.date_in = checkinDate;
      this.date_out = checkoutDate;
      // Sau đó gọi hàm lấy dữ liệu roomtype từ backend
      this.getRoomType();
    }
  }

  // Hàm xử lý sự kiện khi nhấn vào nút Thay đổi tìm kiếm / Ẩn bộ lọc
  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible;
  }

  // Hàm mở dialog hiển thị thông tin chi tiết của một loại phòng
  openDialog(roomType: any) {
    this.dialog.open(roomType);
  }

  // Hàm lấy danh sách các loại phòng theo ngày đặt và ngày trả
  getRoomType() {
    debugger
    if (this.date_in && this.date_out) {
      if (this.date_in <= this.date_out) {
        this.date_in = moment(this.date_in)?.format('DD-MM-YYYY') || '';
        this.date_out = moment(this.date_out)?.format('DD-MM-YYYY') || '';
        const obs = this.roomTypeClientService.findRoomType(this.hotel_id, this.date_in, this.date_out).subscribe({
          next: (res) => {
            console.log(res);
            this.roomTypes = res;
            this.firstTable = false;
            this.dataTable = true;
            this.resultArray = [];
          },
          error: (err) => {
            this.message.create(ERROR, err.message);
          }
        });
        this.subscription.add(obs);
      } else {
        this.message.create(WARNING, 'Vui lòng nhập Ngày nhận phòng < ngày trả phòng');
      }
    } else {
      this.message.create(WARNING, 'Vui lòng nhập đày đủ Ngày nhận phòng - ngày trả phòng');
    }
  }

  // Hàm trả về mảng số lượng người dùng cho hiển thị biểu tượng
  getCapacitysArray(capacityCount: any): number[] {
    return capacityCount ? Array(capacityCount) : [];
  }

  // Hàm tính tổng giá tiền cho một hàng
  calculateRowTotal(room: roomType): number {
    if (room.selectedRoom) {
      return room.selectedRoom.price;
    } else {
      return 0;
    }
  }

  // Hàm tính tổng giá tiền cho toàn bộ bảng
  calculateTotal(roomType: any, $event: any) {
    console.log(roomType);
    console.log(($event.target as HTMLInputElement).value);

    // Cái này có dạng chuỗi '1 phòng - Giá: ₫200,000'
    this.selectedQuantity = ($event.target as HTMLInputElement).value;
    // chuyển đổi số lượng phòng -> number
    const quantityRegex = /(\d+)/;
    const quantityMatch = this.selectedQuantity.match(quantityRegex);
    const quantity = quantityMatch ? parseInt(quantityMatch[0], 10) : 0;

    this.totalQuantity = quantity; // Tổng số lượng
    this.totalPrice = roomType.price_per_night * quantity; // Tổng giá phòng


    //this.totalAmount += this.totalPrice; // Tổng số tiền

    // Kiểm tra xem kết quả đã tồn tại trong resultArray hay chưa
    const existingResult = this.resultArray.find((result) => result.roomType_Id === roomType.id);
    if (existingResult) {
      existingResult.quantity = quantity;
      existingResult.totalPrice = this.totalPrice;
    } else {
      this.resultArray.push({
        roomType_Id: roomType.id,
        roomType_name: roomType.name,
        quantity: quantity,
        totalPrice: this.totalPrice
      });
    }
    this.totalAmount = this.resultArray.reduce((total, result) => total + result.totalPrice, 0);

    console.log("Loại phòng: " + roomType.name);
    console.log("Số lượng: " + quantity);
    console.log("Tổng giá loại phòng: " + this.totalPrice);
  }

  // Lưu dữ liệu lên sessionStorage + chuyển trang thanh toán
  goToPaymentPage() {
    console.log(this.date_in);
    console.log(this.date_out);

    // Lưu dữ liệu vào sessionStorage
    sessionStorage.setItem('resultArray', JSON.stringify(this.resultArray));
    sessionStorage.setItem('totalAmount', this.totalAmount.toString());
    sessionStorage.setItem('dateIn', this.date_in.toString());
    sessionStorage.setItem('dateOut', this.date_out.toString());
    sessionStorage.setItem('hotelId', this.hotel_id.toString());


    // Điều hướng đến trang thanh toán (thay 'payment' bằng URL của trang thanh toán)
    window.location.href = 'booking';
  }

  resetdate() {
    this.date_in = '';
    this.date_out = '';

    this.firstTable = true;
    this.dataTable = false;
  }

}
