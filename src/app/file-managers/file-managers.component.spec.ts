import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagersComponent } from './file-managers.component';

describe('FileManagersComponent', () => {
  let component: FileManagersComponent;
  let fixture: ComponentFixture<FileManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
