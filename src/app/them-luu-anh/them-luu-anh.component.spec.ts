import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemLuuAnhComponent } from './them-luu-anh.component';

describe('ThemLuuAnhComponent', () => {
  let component: ThemLuuAnhComponent;
  let fixture: ComponentFixture<ThemLuuAnhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemLuuAnhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemLuuAnhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
