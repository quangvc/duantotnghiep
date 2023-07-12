import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';


const toggleButton = document.getElementById('showToggleButton') as HTMLButtonElement | null;

const content = document.getElementById('content') as HTMLDivElement | null;

if (toggleButton && content) {
  toggleButton.addEventListener('click', () => {
    if (content.style.display === 'none') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [MessageService],
  styles: [`
      :host ::ng-deep .forms-grid > div {
          display: flex;
          align-items: center;
          padding: 1em;
      }

      :host ::ng-deep .forms-grid > div > div:first-child {
         min-width: 10em;
      }

      input, textarea {
          flex: 1 1 auto;
      }

      :host ::ng-deep .ui-message {
          margin-left: 1em;
      }

      @media screen and (max-width: 64em) {
          :host ::ng-deep .ui-message-text {
              display: none;
          }
      }
  `]
})
export class BookingComponent implements OnInit{
  userform: FormGroup;
  selectedCountry: string;
  countries: any[];
  ingredient: string;
  submitted: boolean = true;

  genders: SelectItem[] = [];

  description: string = '';

  brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];

  filteredBrands: any[] = [];




  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ];
  }
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  items: MenuItem[] = [];
  activeIndex: number = 0;
  ngOnInit() {
    this.items = [
      {
        label: 'Đặt',
        routerLink: 'personal'
      },
      {
        label: 'Xem lại',
        routerLink: 'seat'
      },
      {
        label: 'Thanh toán',
        routerLink: 'payment'
      },
      {
        label: 'Xử lý',
        routerLink: 'confirmation'
      },
      {
        label: 'Gửi phiếu thanh toán',
        routerLink: 'bill'
      }
    ];
    this.userform = this.fb.group({
      'fullname': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
    });

  }











  filterBrands(event: any) {
    this.filteredBrands = [];
    for (let i = 0; i < this.brands.length; i++) {
      let brand = this.brands[i];
      if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBrands.push(brand);
      }
    }
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted', sticky: true });
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
}
