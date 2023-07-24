export class RoleHelper {
  static getAllRoleList(): any[] {
    var lstRoles: any[] = [];
    lstRoles = [
        { value: RoleValue.All, text: 'Tất cả các quyền' },
        { value: RoleValue.Admin, text: RoleLabel.Admin },
        { value: RoleValue.Manager, text: RoleLabel.Manager },
        { value: RoleValue.Client, text: RoleLabel.Client },
    ];
    return lstRoles;
  }
}
export class RoleValue {
  static All = 0;  // All
  static Admin = 1;  // Admin
  static Manager = 2;  // Quản lý
  static Client = 3;  // Khách
}
export class RoleLabel {
  static All = 'Tất cả';  // All
  static Admin = 'Admin';  // Admin
  static Manager = 'Quản lý';  // Đã xem xét
  static Client = 'Khách';  // Khách
}



export class GenderHelper {
  static getAllGenderList(): any[] {
    var lstGenders: any[] = [];
    lstGenders = [
        { value: GenderValue.male, text: GenderLabel.male },
        { value: GenderValue.female, text: GenderLabel.female },
        { value: GenderValue.gay, text: GenderLabel.gay },
    ];
    return lstGenders;
  }
}
export class GenderValue {
  static male = 1;  // Nam
  static female = 2;  // Nữ
  static gay = 3;  // Hết cứu
}
export class GenderLabel {
  static male = 'Nam';  // Nam
  static female = 'Nữ';  // Nữ
  static gay = 'Hết cứu';  // Hết cứu
}
