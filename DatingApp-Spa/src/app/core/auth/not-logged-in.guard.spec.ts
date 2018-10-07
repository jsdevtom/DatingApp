import { TestBed, inject } from '@angular/core/testing';

import { TestingModule } from '@testing/utils';
import { NotLoggedInGuard } from '@app/core/auth/not-logged-in.guard';

describe('LoginPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    });
  });

  it(
    'should be providable',
    inject([NotLoggedInGuard], (guard: NotLoggedInGuard) => {
      expect(guard).toBeTruthy();
    }),
  );
});
