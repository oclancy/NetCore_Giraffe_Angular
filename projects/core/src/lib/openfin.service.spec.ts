import { TestBed } from '@angular/core/testing';

import { OpenfinService } from './openfin.service';

describe('OpenfinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenfinService = TestBed.get(OpenfinService);
    expect(service).toBeTruthy();
  });
});
