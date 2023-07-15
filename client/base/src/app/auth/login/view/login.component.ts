import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_aShared/service/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
  ) {

  }

  formLogin!: FormGroup;
  userData:any;

  ngOnInit() {
    this.formBuildLogin();
    this.checkLogin();
  }

  private formBuildLogin(){
    this.formLogin = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
      remember: [0]
    })
  }

  save(){
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) return;

      this.authService.createLogin(this.formLogin.value).subscribe({
        next: (res) =>{
          const myJSON = JSON.stringify(res);
          sessionStorage.setItem('user', myJSON)
          this.router.navigate(['nine'])
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }

      })
  }

  checkLogin(){
    let user:any = sessionStorage.getItem('user');
    if(user){
      this.router.navigate(['nine'])
    }else{
      this.router.navigate(['login'])
    }
  }

}
