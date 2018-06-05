import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FeaturedItemService } from './featured-item.service';
import { APP_CONFIG, FKConfig } from '../../../app.config';

describe('FeaturedProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [FeaturedItemService,
        { provide: APP_CONFIG, useValue: FKConfig }]
    });
  });

  it('should be created', inject([FeaturedItemService], (service: FeaturedItemService) => {
    expect(service).toBeTruthy();
  }));
});
