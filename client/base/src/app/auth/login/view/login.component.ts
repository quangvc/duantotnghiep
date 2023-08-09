import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_aShared/service/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { MessageService } from 'primeng/api';
import { Auth } from '../../_aShared/auth.class';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


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
    private messageService: MessageService,
    private modal: NzModalService
  ) {

  }

  confirmModal?: NzModalRef;

  formLogin!: FormGroup;
  userData:any;
  user: any

  displayForgotPassword: boolean = false;

  ngOnInit() {
    this.formBuildLogin();
    this.loadAccountFromRemember();
  }

  private formBuildLogin(){
    this.formLogin = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
      remember: []
    })
  }

  loadAccountFromRemember(){
    let sessionRemember:any = sessionStorage.getItem('remember');
    let hasAccount:any = JSON.parse(sessionRemember);
    let accounts: any[] = hasAccount.remember;

    if(accounts){
      this.formLogin.patchValue(accounts[0])
    }
  }

  async save(){
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) return;

      let rememberAccount:any;

      if(!this.formLogin.value.remember){
        rememberAccount = 0;
      }else if(this.formLogin.value.remember){
        rememberAccount = 1;
      }

      let account = {
        login: this.formLogin.value.login,
        password: this.formLogin.value.password,
        remember: rememberAccount
      }

      this.authService.createLogin(account).subscribe({
        next: async(res) =>{
          // Lưu thông tin User
          const myJSON = JSON.stringify(res);
          await sessionStorage.setItem('user', myJSON);

          // Lưu ghi nhớ tài khoản
          let myLocal = JSON.stringify({});
          if(rememberAccount == 1){
            myLocal = JSON.stringify({remember: [account]});
          }
          await sessionStorage.setItem('remember', myLocal);

          // Check quyền
          // this.checkLogin();
          window.history.back();
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }

      })
  }

  async checkLogin(){
    let role = await Auth.User('role');
    if(role){
      if(role === "admin"){
        this.router.navigate(['nine'])
      }
      else if(role === "manager"){
        this.router.navigate(['nine'])
      }
      else{
        this.message.warning('Bạn không đủ quyền truy cập !!');
        this.router.navigate(['home'])
      }
    }
  }

  showForgotPassword(){
    this.displayForgotPassword = true;
  }

  register(){
    this.router.navigate(['/register']);
  }

  emitEvent(event:any){
    this.displayForgotPassword = false;
  }


}
