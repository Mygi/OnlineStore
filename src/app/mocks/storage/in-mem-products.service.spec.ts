import { TestBed, inject } from '@angular/core/testing';

import { InMemDataService } from './in-mem-data.service';

describe('InMemProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemDataService]
    });
  });

  it('should be created', inject([InMemDataService], (service: InMemDataService) => {
    expect(service).toBeTruthy();
  }));
});
