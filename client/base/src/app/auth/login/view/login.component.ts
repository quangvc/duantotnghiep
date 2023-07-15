import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_aShared/service/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {




  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
    private messageService: MessageService
  ) {

  }

  formLogin!: FormGroup;
  userData:any;
  user: any

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
    const self = this;
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) return;

      this.authService.createLogin(this.formLogin.value).subscribe({
        next: (res) =>{
          this.message.success('Đăng nhập thành công');
          const myJSON = JSON.stringify(res);
          sessionStorage.setItem('user', myJSON)
          setTimeout(transfer, 1000);

          function transfer() {
            self.userData = sessionStorage.getItem('user');
            self.user = JSON.parse(self.userData);
            console.log(self.user);

            if(self.user.user.name === "Admin"){
              self.router.navigate(['nine'])
            }else{
              self.router.navigate(['home'])
            }
          }

        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }

      })
  }

  checkLogin(){
    let userLogged:any = sessionStorage.getItem('user');
    let user = JSON.parse(userLogged);
    console.log(user);

    if(user.user.name === "Admin"){
      this.router.navigate(['nine'])
    }else{
      this.router.navigate(['home'])
    }
  }

}
