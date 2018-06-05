import { Component, OnInit } from '@angular/core';

// shared services

// shared models
import { ProductContract } from '../../../../global/contracts/modules/products.contract';
import { WishlistService } from '../../../../core/wishlist/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss']
})
export class WishlistComponent implements OnInit {

  products: ProductContract[] = [];
  constructor(private dataservice: WishlistService) {}

  ngOnInit() {
    this.dataservice.getWishlist().subscribe((val) => {
      // console.log(val);
      this.products = val.products;
    });
  }

}
