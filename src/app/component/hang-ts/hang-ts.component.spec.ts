import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangTSComponent } from './hang-ts.component';

describe('HangTSComponent', () => {
  let component: HangTSComponent;
  let fixture: ComponentFixture<HangTSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HangTSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangTSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
