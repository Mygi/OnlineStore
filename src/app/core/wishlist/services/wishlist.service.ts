import { Injectable } from '@angular/core';
// rxjs
import { BehaviorSubject } from 'rxjs';

// Models
import { Wishlist, WishlistProducts } from '../models/wishlist.model';
import { ProductContract } from '../../../global/contracts/modules/products.contract';
@Injectable()
export class WishlistService {
  private wishlist: BehaviorSubject<Wishlist>;
  // Probably need to inject localStorage
  constructor() {
    this.wishlist = new BehaviorSubject < Wishlist >( {
      userId: 1,
      products: []
    } );
    // if ( localStorage.getItem('wishlist') ) {
    //   this.wishlist.next(JSON.parse(localStorage.getItem('wishlist')) );
    // }
  }

  createWishlist( userId: number ) {
    const list = new Wishlist( userId );
    this.wishlist.next( list );
  }

  public hasProduct(productId: ProductContract): boolean {
    const list = this.wishlist.getValue();
    return (list.products.findIndex(x => x.productID === productId.productID) !== -1);
  }
  addProduct(productId: ProductContract) {
    const list = this.wishlist.getValue();
    const Index = list.products.findIndex(x => x.productID === productId.productID);
    if (Index === -1) {
      list.products.push(productId as WishlistProducts);
      this.wishlist.next(list);
      localStorage.setItem('wishlist', JSON.stringify( this.wishlist.getValue() ) );
    }
  }
  deleteProduct(productId: number) {
    const list = this.wishlist.getValue();
    const index = list.products.findIndex(x => x.productID === productId);
    list.products.splice(index, 1);
    this.wishlist.next(list);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist.getValue()));
  }
  getWishlist(): BehaviorSubject<Wishlist> {
    if (localStorage.getItem('wishlist')) {
      this.wishlist.next(JSON.parse(localStorage.getItem('wishlist')));
    }
    return this.wishlist;
  }
}
