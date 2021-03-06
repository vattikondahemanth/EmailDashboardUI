import { TestBed } from '@angular/core/testing';

import { ActionableEmailService } from './actionable-email.service';

describe('ActionableEmailService', () => {
  let service: ActionableEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionableEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
