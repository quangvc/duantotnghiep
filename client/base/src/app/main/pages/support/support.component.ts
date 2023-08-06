import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportClientService } from '../../services/support-client.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  supportForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private supportClientService: SupportClientService,
    private messageService: MessageService,
  ) {
    this.supportForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      status: [1],
    });
  }

  ngOnInit() {
  }

  // Add a method to handle the form submission
  onSubmit() {
    if (this.supportForm.valid) {
      const formData = this.supportForm.value; // Lấy dữ liệu từ FormGroup
      this.supportClientService.createSupport(formData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Chúng tôi sẽ có gắp phản hồi lại trong thời gian sớm nhất' });
          console.log('Feedback created successfully:', response);

          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        },
        (error) => {
          console.error('Error creating feedback:', error);
          this.messageService.add({ severity: 'warn', summary: 'Cảnh báo', detail: 'Có lỗi!' });
        }
      );
    }
  }
}
