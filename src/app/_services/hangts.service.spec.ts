import { TestBed } from '@angular/core/testing';

import { HangtsService } from './hangts.service';

describe('HangtsService', () => {
  let service: HangtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HangtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
