import { TestBed, inject } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WishlistService } from './wishlist.service';
import { Wishlist } from '../models/wishlist.model';

describe('WishlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [WishlistService]
    });
  });

  it('should be created', inject([WishlistService], (service: WishlistService) => {
    expect(service).toBeTruthy();
  }));
});
