import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { ProductContract } from '../../../../global/contracts/modules/products.contract';
import { ShopService } from '../../../shop/services/shop.service';
import { Observable } from 'rxjs';
import { SHOP_PROVIDER, ShopProvider } from '../../../../global/contracts/modules/shop.contract';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: []
})
export class ProductListComponent implements OnInit {
  public filters: number[] = [];
  public products: ProductContract[] = [];
  productFilterText = '';
  sortItem = 'name';
  ascending = true;
  start = 0;
  end = 20;
  last = 20;
  productsPerPage = 20;
  constructor(private service: ProductService, @Inject(SHOP_PROVIDER) private shopService: ShopProvider,
   private authService: AuthenticationProvider) { }

  ngOnInit() {
    this.getProducts();
    // this.service.getProductsForCategoryId(1)
  }

  private getProducts() {
    const userId = this.authService.getAuthUser().getId();
    this.shopService.getUserShop(userId).subscribe(
      shop => this.getShopProducts(shop.id)
    );
  }
  public getShopProducts(shopId: number): void {
    this.service.getProductsForShopId(shopId).subscribe( data =>
      this.products = data
    );
  }
  onFilterChange(index: number, event) {
    // console.log(event);
    // console.log(this.filters);
  }
  updateList(event) {
    this.start = event.first;
    this.end = event.first + event.rows;
    this.productsPerPage = event.rows;
  }
}
