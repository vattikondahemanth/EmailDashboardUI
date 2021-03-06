import { TestBed } from '@angular/core/testing';

import { EscalatedEmailService } from './escalated-email.service';

describe('EscalatedEmailService', () => {
  let service: EscalatedEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscalatedEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
