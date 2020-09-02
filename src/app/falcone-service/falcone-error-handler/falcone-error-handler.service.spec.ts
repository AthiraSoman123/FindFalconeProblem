import { TestBed } from '@angular/core/testing';

import { FalconeErrorHandlerService } from './falcone-error-handler.service';

describe('FalconeErrorHandlerService', () => {
  let service: FalconeErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FalconeErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
