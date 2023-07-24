
export class Auth{
  static User(value?:any){
    let sessionUser:any = sessionStorage.getItem('user');
    let user:any = JSON.parse(sessionUser);

    switch (value) {
      case "role":
        return user.role[0];
        break;
      case "token":
        return user.token;
        break;
      case "user":
        return user.user;
        break;
      case "permissions":
        return user.permissions;
        break;
      default:
        return user
        break;
    }
  }
  static Hotel(value?:any){
    let role = Auth.User('role');
    let user = Auth.User('user');

    let hotel:any;

    if(role == "admin"){
      return hotel = null;
    }else{
      return hotel = user.hotel_id;
    }
  }
  static Admin(){
    switch (Auth.User('role')) {
      case "admin":
        return true;
        break;
      default:
        return false;
        break;
    }
  }

  static Manager(){
    switch (Auth.User('role')) {
      case "manager":
        return true;
        break;
      default:
        return false;
        break;
    }
  }
}
