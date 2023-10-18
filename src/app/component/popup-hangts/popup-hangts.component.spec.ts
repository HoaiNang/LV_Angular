import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupHangtsComponent } from './popup-hangts.component';

describe('PopupHangtsComponent', () => {
  let component: PopupHangtsComponent;
  let fixture: ComponentFixture<PopupHangtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupHangtsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupHangtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
