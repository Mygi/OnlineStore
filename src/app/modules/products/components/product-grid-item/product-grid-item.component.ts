// Core
import { Component, OnInit, Input } from '@angular/core';

// Models
import { Product } from '../../models/product.model';
import { ProductContract } from '../../../../global/contracts/modules/products.contract';



@Component({
  selector: 'app-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  styleUrls: ['./product-grid-item.component.scss']
})
export class ProductGridItemComponent implements OnInit {

  @Input() product: ProductContract;

  constructor() { }

  ngOnInit() {
  }

}
