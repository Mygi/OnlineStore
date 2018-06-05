import { Component, OnInit, Input } from '@angular/core';
import { ProductContract } from '../../../../global/contracts/modules/products.contract';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist-selecter',
  templateUrl: './wishlist-selecter.component.html',
  styleUrls: ['./wishlist-selecter.component.scss']
})
export class WishlistSelecterComponent implements OnInit {
  @Input() item: ProductContract;
  constructor(private wishlistService: WishlistService) { }

  ngOnInit() {
  }

  productAdded(): boolean {
    return this.wishlistService.hasProduct(this.item);
  }
  toggleWishList() {
    // this.wishlistService.hasProduct
    if (this.wishlistService.hasProduct(this.item) ) {
      this.deleteFromWishList(this.item);
    } else {
      this.wishlistService.addProduct(this.item);
    }
  }
  deleteFromWishList(product: ProductContract) {
    this.wishlistService.deleteProduct(product.productID);
  }
}
