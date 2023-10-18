import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupHouseComponent } from './popup-house.component';

describe('PopupHouseComponent', () => {
  let component: PopupHouseComponent;
  let fixture: ComponentFixture<PopupHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
