import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_mShared/service/user.service';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from '../../_mShared/model/url.class';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/_aShared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-account',
  templateUrl: './update-user-account.component.html',
  styleUrls: ['./update-user-account.component.scss']
})
export class UpdateUserAccountComponent implements OnInit {

  formAccount!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalService,
    private authService: AuthService,
    private router: Router
  ) { }

  confirmModal?: NzModalRef;

  user = Auth.User('user');

  role = Auth.User('role');

  hotel = Auth.Hotel();

  admin = Auth.Admin();

  ngOnInit() {
    this.createFormAccount();
    this.getUser();
  }

  private createFormAccount(){
    this.formAccount = this.fb.group({
      email: [null, Validators.required],
      name: [null, Validators.required],
      gender: [null, Validators.required],
      phone_number: [null, Validators.required]
    })
  }

  getUser(){
    if(this.user){
      this.formAccount.patchValue({
        email: this.user.email,
        name: this.user.name,
        gender: this.user.gender,
        phone_number: this.user.phone_number,
      })
    }
  }

  confirmSave(){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Xác nhận lưu thay đổi ?`,
      nzContent: 'Bạn phải đăng nhập lại sau khi cập nhật !!',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.save();
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  save(){
    this.formAccount.markAllAsTouched();
    if (this.formAccount.invalid) return;

    if(this.user){
      this.userService.updateUser(this.formAccount.value, this.user.id).subscribe({
        next: (res) => {
          this.message.create(SUCCESS, `Cập nhật thành công`);
          setTimeout(() => {
            this.logOut();
          }, 1000);
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }
      })
    }
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



}
