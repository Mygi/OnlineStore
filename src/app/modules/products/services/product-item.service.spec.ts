import { TestBed, inject } from '@angular/core/testing';

import { ProductItemService } from './product-item.service';
import { MocksModule } from '../../../mocks/mocks.module';

describe('ProductItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      providers: [ProductItemService]
    });
  });

  it('should be created', inject([ProductItemService], (service: ProductItemService) => {
    expect(service).toBeTruthy();
  }));
});
