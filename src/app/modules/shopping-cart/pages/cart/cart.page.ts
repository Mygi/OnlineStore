import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPageComponent implements OnInit {
  cartitems: string[] = ['Seller 1', 'Seller 2'];
  constructor() { }

  ngOnInit() {
  }

}
