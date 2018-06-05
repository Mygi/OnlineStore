import { TestBed, inject } from '@angular/core/testing';

// Test components
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Under test
import { ProductService } from './product.service';

// Config
import { APP_CONFIG, FKConfig } from '../../../app.config';
import { CategoryService } from '../../../core/categories/services/category.service';
import { FormDataService } from '../../../core/fk-forms/services/form-data.service';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ProductService,
        { provide: APP_CONFIG, useValue: FKConfig },
      CategoryService, FormDataService]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
