import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistItemComponent } from './wishlist-item.component';
import { WishlistSelecterComponent } from '../wishlist-selecter/wishlist-selecter.component';
import { MockCoreModule } from '../../../../mocks/mockCore.module';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../../../modules/products/models/product.model';

describe('WishlistItemComponent', () => {
  let component: WishlistItemComponent;
  let fixture: ComponentFixture<WishlistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MockCoreModule],
      declarations: [ WishlistItemComponent, WishlistSelecterComponent ],
      providers: [WishlistService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistItemComponent);
    component = fixture.componentInstance;
    component.product = new Product();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
