import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachHinhAnhComponent } from './danh-sach-hinh-anh.component';

describe('DanhSachHinhAnhComponent', () => {
  let component: DanhSachHinhAnhComponent;
  let fixture: ComponentFixture<DanhSachHinhAnhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhSachHinhAnhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhSachHinhAnhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
