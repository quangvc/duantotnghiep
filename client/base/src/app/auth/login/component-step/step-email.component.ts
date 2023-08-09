import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../_aShared/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';

@Component({
  selector: 'step-email',
  template: `
    <form [formGroup]="formEmail" (ngSubmit)="sendMail()">
      <div class="row">

        <div class="col-12">
          <div class="mb-3">
            <input type="email" class="form-control" id="name" formControlName="email" placeholder="Vui lòng nhập email" autofocus>
          </div>
          <error-msg [profileForm]="formEmail" key="email" check="required" msg="Vui lòng không để trống."></error-msg>
        </div>

        <button nz-button nzType="primary" [nzSize]="'large'" [nzLoading]="isLoading" >Send Mail</button>

      </div>
    </form>
  `,
})
export class StepEmailComponent implements OnInit {
  @Output() eventEmit = new EventEmitter<any>();
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private message: NzMessageService,
  ) { }

  formEmail!: FormGroup

  isLoading: boolean = false;

  ngOnInit() {
    this.createFormEmail();
  }

  private createFormEmail(){
    this.formEmail = this.fb.group({
      email: [null, Validators.required]
    })
  }

  sendMail(){
    this.isLoading = true;
    this.formEmail.markAllAsTouched();
    if(this.formEmail.invalid) return;

    const formData = new FormData();

    formData.append("email", this.formEmail.value.email);

    this.authService.sendResetLink(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message.create(SUCCESS, `Dữ liệu đã được gửi vào trong hòm thư của bạn !!`)
        this.eventEmit.emit();
      },
      error: (err) => {
        this.isLoading = false;
        this.message.create(ERROR, err.error.message);
      }
    })
  }

}
