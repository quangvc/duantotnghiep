export enum NineStatus {
  Deactive = 0,
  Active = 1,
}

export enum StatusBookings {
  Unpaid = 0, // đang đặt, chưa thanh toán
  Unconfirmed = 1, // đã thanh toán - chưa xếp phòng
  Confirmed = 2, // admin xác nhận - đã xếp phòng
  Using = 3, // đã checkout
  Cancel = 4, // hủy
  WaitingCancel = 7, // chờ đợi hủy
  Clean = 99,
}

