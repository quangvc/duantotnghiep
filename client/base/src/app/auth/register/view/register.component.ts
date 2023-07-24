import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_aShared/service/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  formRegister!: FormGroup;

  ngOnInit() {
    this.formBuildRegister();
  }

  private formBuildRegister(){
    this.formRegister = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone_number: [null, Validators.required],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],
    })
  }

  linkToLogin(){
    this.router.navigate(['login']);
  }

  save(){
    this.formRegister.markAsTouched();
    if(this.formRegister.invalid) return;

    let register = {
      name: this.formRegister.value.name,
      email: this.formRegister.value.email,
      phone_number: this.formRegister.value.phone_number,
      password: this.formRegister.value.password,
      password_confirmation: this.formRegister.value.password_confirmation,
    }

    this.authService.register(register).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, "Tạo tài khoản thành công !!");
        console.log(res)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
    // if(this.formRegister.valid){
    //   this.authService.register(this.formRegister.value).subscribe(res => {
    //     alert('thanh cong!');
    //     this.router.navigate(['login']);
    //   })
    // }
  }

}
