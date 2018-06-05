import { Component, OnInit, Inject } from '@angular/core';

import { ProductContract, ProductsProvider, PRODUCTS_PROVIDER } from '../../../../global/contracts/modules/products.contract';
import { ShopService } from '../../services/shop.service';
import { Shop } from '../../models/shop.model';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss']
})
export class ShopComponent implements OnInit {

  products: ProductContract[] = [];
  public shop: Shop = new Shop();
  private userId: number;

  constructor(@Inject(PRODUCTS_PROVIDER) private dataService: ProductsProvider, private service: ShopService,
             private userProfileService: AuthenticationProvider) { }

  ngOnInit() {
    this.setUser();
    this.getHttpShop();
  }
  getProducts() {
    this.dataService.getProductsForShopId(this.shop.id).subscribe(
      data => this.products = data,
      error => console.log(error)
      // () => console.log('Get all complete' + this.featuredProducts[0].caption)
    );
  }
  /**
  * Get Shop from service
  *
  * @memberof MyShopPageComponent
  */
  private getHttpShop() {
    this.service.getUserShop(this.userId).subscribe(
      data => this.arrangeShopData(data)
    );
  }

  /**
   * Post handle for http get service
   *
   * @param {Shop[]} filteredShops
   * @memberof MyShopPageComponent
   */
  private arrangeShopData(shop: Shop) {
    if (shop !== undefined ) {
      this.shop = shop;
      this.getProducts();
    }
  }
  private setUser() {
    this.userId = this.userProfileService.getAuthUser().getId();
    this.shop.userId = this.userId;
  }
}
