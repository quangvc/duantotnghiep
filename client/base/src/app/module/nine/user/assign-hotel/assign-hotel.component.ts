import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, firstValueFrom } from 'rxjs';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { HotelsService } from 'src/app/module/_mShared/service/hotels.service';
import { UserService } from 'src/app/module/_mShared/service/user.service';

@Component({
  selector: 'app-assign-hotel',
  templateUrl: './assign-hotel.component.html',
  styleUrls: ['./assign-hotel.component.scss']
})
export class AssignHotelComponent implements OnInit , OnDestroy{

  @Input() txtRole: any;
  @Input() userId: any;
  @Output() closeModal = new EventEmitter<any>();

  private subscription = new Subscription();

  constructor(private fb: FormBuilder,
    private hotelService: HotelsService,
    private message: NzMessageService,
    private userService: UserService
    ) { }

  assignHotel!: FormGroup

  hotels: any[] = [];
  users: any[] = [];

  hotelId: any;

  ngOnInit() {
    this.createFormAssignHotel();
    this.getHotels();
    if(this.txtRole == "manager"){
      this.assignHotel.get('hotel_id')?.setValidators(Validators.required);
    }
  }

  private createFormAssignHotel(){
    this.assignHotel = this.fb.group({
      hotel_id: [null]
    })
  }

  getHotels(){
    let obs = this.hotelService.getHotels().subscribe({
      next: (res) => {
        this.hotels = res.data;
        this.checkIsset();
      },
      error: (err) => {{
        this.message.create(ERROR, err.error.message);
        this.message.create(ERROR, err.message);
      }}
    })
    this.subscription.add(obs);
  }

  async checkIsset(){
    let x = await firstValueFrom(this.userService.getUsers());
    this.users = x.data;

    let hotelFake:any[] = [];
    this.users.forEach(user => {
      if(user.hotelId){
        hotelFake.push(user.hotel);
      }
    });

    for (const hotel of this.hotels) {
      for (let i = 0; i < hotelFake.length; i++) {
        const element = hotelFake[i];
        if(hotel.id == element.id){
          hotel.disabled = true;
        }
      }
    }

    this.hotels = await this.hotels.filter(h => h.disabled != true);

  }

  saveAssign(event:any){

    this.assignHotel.markAllAsTouched();
    if(this.assignHotel.invalid) return;

    this.userService.$hotelId.next(event.target.value)

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
