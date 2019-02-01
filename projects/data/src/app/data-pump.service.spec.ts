import { TestBed } from '@angular/core/testing';

import { DataPumpService } from './data-pump.service';

describe('DataPumpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataPumpService = TestBed.get(DataPumpService);
    expect(service).toBeTruthy();
  });
});
