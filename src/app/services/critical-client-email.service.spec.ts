import { TestBed } from '@angular/core/testing';

import { CriticalClientEmailService } from './critical-client-email.service';

describe('CriticalClientEmailService', () => {
  let service: CriticalClientEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriticalClientEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
