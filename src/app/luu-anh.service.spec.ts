import { TestBed } from '@angular/core/testing';

import { LuuAnhService } from './luu-anh.service';

describe('LuuAnhService', () => {
  let service: LuuAnhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuuAnhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
