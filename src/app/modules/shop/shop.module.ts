import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SecurityModule } from '../security/security.module';
import { ShopService } from './services/shop.service';
import { FormsModule } from '@angular/forms';

// 3rd Party
import { MessagesModule } from 'primeng/messages';
import { CoreInterfaceModule } from '../../core/core-interface/core-interface.module';
import { ShopFormComponent } from './components/shop-form/shop-form.component';
import { BankingService } from './services/banking.service';
import { ShopComponent } from './pages/shop/shop.page';
import { ShopRoutesModule } from './shop.routes';
import { ProductsModule } from '../products/products.module';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SecurityModule,
    FormsModule,
    CoreInterfaceModule,
    MessagesModule,
    ShopRoutesModule,
    ProductsModule
  ],
  declarations: [ShopFormComponent, ShopComponent, SellerDashboardComponent],
  providers: [ ShopService, BankingService ],
  exports: [ShopFormComponent]
})
export class ShopModule { }
