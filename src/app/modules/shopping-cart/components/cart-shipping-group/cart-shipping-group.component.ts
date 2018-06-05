import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-shipping-group',
  templateUrl: './cart-shipping-group.component.html',
  styleUrls: ['./cart-shipping-group.component.scss']
})
export class CartShippingGroupComponent implements OnInit {
  @Input() shippingType: string;

  products = [1, 2, 3];
  constructor() { }

  ngOnInit() {
  }

}
