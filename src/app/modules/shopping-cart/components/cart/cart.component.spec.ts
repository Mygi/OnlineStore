import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartShippingGroupComponent } from '../cart-shipping-group/cart-shipping-group.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { ShippingModule } from '../../../shipping/shipping.module';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule, ShippingModule],
      declarations: [CartComponent, CartShippingGroupComponent, CartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
