import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShippingGroupComponent } from './cart-shipping-group.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { ShippingOptionsComponent } from '../../../shipping/components/shipping-options/shipping-options.component';

describe('CartShippingGroupComponent', () => {
  let component: CartShippingGroupComponent;
  let fixture: ComponentFixture<CartShippingGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartShippingGroupComponent, CartItemComponent, ShippingOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShippingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
