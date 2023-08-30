import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blockPageGuard } from './block-page.guard';

describe('blockPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => blockPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
