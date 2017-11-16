import { TestBed, async, inject } from '@angular/core/testing';

import { AuthanticationGuard } from './authantication.guard';

describe('AuthanticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthanticationGuard]
    });
  });

  it('should ...', inject([AuthanticationGuard], (guard: AuthanticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
