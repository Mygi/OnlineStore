import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingOptionsComponent } from './components/shipping-options/shipping-options.component';
import { CoreInterfaceModule } from '../../core/core-interface/core-interface.module';
import { ShippingComponent } from './pages/shipping/shipping.page';

@NgModule({
  imports: [
    CommonModule,
    CoreInterfaceModule
  ],
  declarations: [ShippingOptionsComponent, ShippingComponent],
  exports: [ShippingOptionsComponent]
})
export class ShippingModule { }
