import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_aShared/service/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  formResetPassword!: FormGroup;

  ngOnInit() {
    this.formBuildRegister();
  }

  private formBuildRegister(){
    this.formResetPassword = this.fb.group({
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],
    })
  }

  linkToLogin(){
    this.router.navigate(['login']);
  }

  save(){
    this.formResetPassword.markAsTouched();
    if(this.formResetPassword.invalid) return;
    const currentUrl = this.router.url;
    let url = currentUrl.split("=");
    let email = url[1].split("&");

    let convertEmail = email[0];

    let reset = {
      token: url[2],
      email: convertEmail,
      password: this.formResetPassword.value.password,
      password_confirmation: this.formResetPassword.value.password_confirmation,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${url[2]}`
      })
    }

    this.authService.updatePass(reset,httpOptions).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, "Tạo tài khoản thành công !!");
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })

  }

}
