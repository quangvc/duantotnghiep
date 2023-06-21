import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailAmenitiesComponent } from './hotel-detail-amenities.component';

describe('HotelDetailAmenitiesComponent', () => {
  let component: HotelDetailAmenitiesComponent;
  let fixture: ComponentFixture<HotelDetailAmenitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelDetailAmenitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelDetailAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
