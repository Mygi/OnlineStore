import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CoreInterfaceModule } from '../../core/core-interface/core-interface.module';
import { OrdersComponent } from './pages/orders/orders.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CoreInterfaceModule,
    RouterModule
  ],
  declarations: [ OrderItemComponent, OrderListComponent,
  OrdersComponent],
  exports: [OrderItemComponent, OrderListComponent],
  providers: []
})
export class OrdersModule { }
