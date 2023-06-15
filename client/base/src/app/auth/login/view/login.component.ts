import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_aShared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    if(this.formLogin.valid){
      this.authService.createLogin(this.formLogin.value).subscribe((res) => {
        const myJSON = JSON.stringify(res);
        sessionStorage.setItem('user', myJSON)
        this.router.navigate(['nine'])
      })
    }
    // if(this.formLogin.valid){
    //   this.authService.getLoginByUsername(this.formLogin.value.username).subscribe((res) => {
    //     this.userData = res;

    //     let udata = this.userData[0];
    //     if(udata.password === this.formLogin.value.password){
    //       if(udata.isActive){
    //         sessionStorage.setItem('username', udata.username)
    //         sessionStorage.setItem('userRole', udata.role)
    //         this.router.navigate(['nine'])
    //       }else{
    //         alert("Tài khoản không đủ quyền truy cập");
    //       }
    //     }else{
    //       alert("Sai mật khẩu");
    //     }
    //   })
    // }
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
