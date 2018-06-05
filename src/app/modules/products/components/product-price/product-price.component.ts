import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ProductItem } from '../../models/product-detail.model';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnChanges {
  @Input() productItem: ProductItem = new ProductItem();
  @Output() hasChanged = new EventEmitter<ProductItem>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.hasChanged.emit(this.productItem);
  }
}
