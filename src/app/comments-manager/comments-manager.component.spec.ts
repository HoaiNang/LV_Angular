import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsManagerComponent } from './comments-manager.component';

describe('CommentsManagerComponent', () => {
  let component: CommentsManagerComponent;
  let fixture: ComponentFixture<CommentsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
