export class StatusHelper {
  static getAllStatusList(): any[] {
    var lstStatus: any[] = [];
    lstStatus = [
        { value: StatusValue.PENDING, text: StatusLabel.PENDING },
        { value: StatusValue.RESERVED, text: StatusLabel.RESERVED },
        { value: StatusValue.CONFIRMED, text: StatusLabel.CONFIRMED },
        { value: StatusValue.COMPLETED, text: StatusLabel.COMPLETED },
        { value: StatusValue.CANCELLED, text: StatusLabel.CANCELLED },
    ];
    return lstStatus;
  }

  static getStatusText(statusValue: number): string {
    switch (statusValue) {
      case StatusValue.PENDING:
        return StatusLabel.PENDING;
      case StatusValue.RESERVED:
        return StatusLabel.RESERVED;
      case StatusValue.CONFIRMED:
        return StatusLabel.CONFIRMED;
      case StatusValue.COMPLETED:
        return StatusLabel.COMPLETED;
      case StatusValue.CANCELLED:
        return StatusLabel.CANCELLED;
      default:
        return 'Unknown';
    }
  }
}



export class StatusValue {
  static PENDING = 0;  // PENDING
  static RESERVED = 1;  // RESERVED
  static CONFIRMED = 2;  // Quản lý
  static COMPLETED = 3;  // Khách
  static CANCELLED = 4;  // Khách
}
export class StatusLabel {
  static PENDING = 'Chưa thanh toán';  // PENDING
  static RESERVED = 'Đã thanh toán';  // RESERVED
  static CONFIRMED = 'Admin xác nhận';  // Đã xem xét
  static COMPLETED = 'Đã checkout';  // Khách
  static CANCELLED = 'Hủy';  // Khách
}

// public const PENDING = 0;   // đang đặt, chưa thanh toán
//     public const RESERVED = 1;  // đã thanh toán
//     public const CONFIRMED = 2; // admin xác nhận
//     public const COMPLETED = 3; // đã checkout
//     public const CANCELLED = 4; // hủy
