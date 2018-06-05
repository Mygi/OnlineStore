import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist-menu',
  templateUrl: './wishlist-menu.component.html',
  styleUrls: ['./wishlist-menu.component.scss']
})
export class WishlistMenuComponent implements OnInit {
  public wishListItems = 0;
  constructor(public wishlistService: WishlistService) { }

  ngOnInit() {
  }

  getWishlistItems() {
    this.wishlistService.getWishlist().subscribe((val) => {
      this.wishListItems = val.products.length;
    });
  }
}
