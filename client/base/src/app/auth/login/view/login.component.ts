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
