import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDatphongComponent } from './popup-datphong.component';

describe('PopupDatphongComponent', () => {
  let component: PopupDatphongComponent;
  let fixture: ComponentFixture<PopupDatphongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDatphongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDatphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
