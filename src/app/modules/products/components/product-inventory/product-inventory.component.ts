import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { ProductItem } from '../../models/product-detail.model';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: []
})
export class ProductInventoryComponent implements OnChanges {

  @Output() hasChanged = new EventEmitter<ProductItem>();
  @Input() productItem: ProductItem;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.hasChanged.emit(this.productItem);
  }

}
