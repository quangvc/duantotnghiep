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
      { value: GenderValues.male, text: GenderLabel.male },
      { value: GenderValues.female, text: GenderLabel.female },
      { value: GenderValues.gay, text: GenderLabel.gay },
    ];
    return lstGenders;
  }
  static getGenderText(GenderValue: number): string {
    switch (GenderValue) {
      case GenderValues.male:
        return GenderLabel.male;
      case GenderValues.female:
        return GenderLabel.female;
      case GenderValues.gay:
        return GenderLabel.gay;
      default:
        return 'Unknown';
    }
  }
}

export class GenderValues {
  static male = 1;  // Nam
  static female = 2;  // Nữ
  static gay = 3;  // Hết cứu
}
export class GenderLabel {
  static male = 'Nam';  // Nam
  static female = 'Nữ';  // Nữ
  static gay = 'Hết cứu';  // Hết cứu
}
