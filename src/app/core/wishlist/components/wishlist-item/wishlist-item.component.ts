import { Component, OnInit, Input } from '@angular/core';
import { ProductContract } from '../../../../global/contracts/modules/products.contract';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent implements OnInit {
  @Input() product: ProductContract;
  constructor() { }

  ngOnInit() {
  }

}
