import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription, firstValueFrom } from 'rxjs';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { AuthService } from 'src/app/auth/_aShared/service/auth.service';
import { GenderHelper } from 'src/shared/helpers/AuthHelper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthClientService } from '../../services/auth-client.service';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  auth = Auth.User('user');
  logged: any
  notLogin: any
  userData:any = sessionStorage.getItem('user');
  user = JSON.parse(this.userData);
  path: any
  hasPermisson: boolean;
  ltsGenders: any;
  selectedGender: number;

  userForm: FormGroup;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private AuthClientService: AuthClientService,
    private message: NzMessageService,

  ) {
    this.selectedGender = 0; // hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
  }

  ngOnInit() {
    console.log(this.auth);

    this.checkLogin();
    this.getValueFormUpdate()
    this.ltsGenders = GenderHelper.getAllGenderList();

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      gender: [0, Validators.required],
      avatar: ['', Validators.required],
    });
  }

  getValueFormUpdate(){
    let userId = this.auth.id
    if(userId) {
      let obs = this.AuthClientService.getUser(userId).subscribe({
        next: (res) => {
          console.log(res);

          this.userForm.patchValue(res.data);
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }
      })

      this.subscription.add(obs);
    }
  }

  handleUpdate(){
    if (this.userForm.invalid) return;

      let id = this.auth.id;
      let newData = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        phone_number: this.userForm.value.phone_number,
        gender: +this.userForm.value.gender,
      }


      let Update = this.AuthClientService.Update(id,newData);
      Update.subscribe({
        next: (user:any) => {
          this.message.create(SUCCESS, `${id ? "Cập nhật" : "Thêm mới"} thành công`);
          this.hideDiv();
          // sessionStorage.setItem('user', user);
        },
        error: (err:any) => {
          this.message.create(ERROR, err.error.message);
        }
      })
  }

  checkLogin(){
    let userLogged:any = sessionStorage.getItem('user');
    let user = JSON.parse(userLogged);

    if (user && user.role && user.role.length > 0) {
      if (user.role[0] === "client") {
        this.hasPermisson = false;
      } else {
        this.hasPermisson = true;
      }
    } else {
      // Xử lý khi giá trị không xác định
      // alert('User or role is undefined');
    }
  }

  confirmDialog() {
    this.confirmationService.confirm({
      message: 'Bạn có muốn đăng xuất?',
      accept: () => {
        this.logOut();
      },
      reject: () => {
        // Xử lý khi người dùng từ chối (Cancel)
        console.log('Người dùng từ chối');
      }
    });
  }

  async logOut(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.User().token}`
      })
    }
    await firstValueFrom(this.authService.createLogout(httpOptions));
    await sessionStorage.removeItem('user');
    this.router.navigate(['login'])
  }




  showButton2: boolean = false;
  showViewDiv: boolean = true;
  showEditDiv: boolean = false;
  showDiv() {
    this.showViewDiv = false;
    this.showEditDiv = true;
    this.showButton2 = true;
  }

  hideDiv() {
    this.showViewDiv = true;
    this.showEditDiv = false;
    this.showButton2 = false;
  }
}
