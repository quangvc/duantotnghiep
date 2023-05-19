import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_aShared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  formRegister!: FormGroup;

  ngOnInit() {
    this.formBuildRegister();
  }

  private formBuildRegister(){
    this.formRegister = this.fb.group({
      id: ["abc-xyc-1qwe"],
      name: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
      role: [],
      isActive: [false]
    })
  }

  save(){

    if(this.formRegister.valid){
      this.authService.register(this.formRegister.value).subscribe(res => {
        alert('thanh cong!');
        this.router.navigate(['login']);
      })
    }
  }

}
