import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// For shipping components
import { ShippingModule } from '../shipping/shipping.module';

// Components
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartTotalsComponent } from './components/cart-totals/cart-totals.component';
import { CartShippingGroupComponent } from './components/cart-shipping-group/cart-shipping-group.component';
import { CartMenuComponent } from './components/cart-menu/cart-menu.component';
import { CartComponent } from './components/cart/cart.component';
import { CoreInterfaceModule } from '../../core/core-interface/core-interface.module';
import { CartPageComponent } from './pages/cart/cart.page';
import { CheckoutComponent } from './pages/checkout/checkout.page';


@NgModule({
  imports: [
    CommonModule,
     ShippingModule,
     CoreInterfaceModule
  ],
  declarations: [CartItemComponent, CartTotalsComponent, CartShippingGroupComponent,
                 CartMenuComponent, CartComponent, CartPageComponent, CheckoutComponent],
  exports: [CartMenuComponent, CartComponent, CartTotalsComponent]
})
export class ShoppingCartModule { }
