import { TestBed, inject } from '@angular/core/testing';

import { AuthanticationService } from './authantication.service';

describe('AuthanticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthanticationService]
    });
  });

  it('should be created', inject([AuthanticationService], (service: AuthanticationService) => {
    expect(service).toBeTruthy();
  }));
});
