import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductItem, Price } from '../../models/product-detail.model';
import { ProductService } from '../../services/product.service';
import { ImageContract } from '../../../../global/contracts/modules/image.contract';

@Component({
  selector: 'app-product-item-form',
  templateUrl: './product-item-form.component.html',
  styleUrls: ['./product-item-form.component.scss']
})
export class ProductItemFormComponent implements OnInit {
  @Input() productItem: ProductItem = new ProductItem();
  public asTemplate = false;
  @Input() hasOptions = false;
  @Output() changed = new EventEmitter<{item: ProductItem, asTemplate: boolean}>();
  @Output() galleryChanged = new EventEmitter<{ item: ProductItem, asTemplate: boolean }>();
  @Input() gallery: ImageContract[] = [];
  constructor(private service: ProductService) { }

  ngOnInit() {
    if (this.productItem.discountPrice as any === 0) {
      this.productItem.discountPrice = new Price();
      this.productItem.discountPrice.value = 0.0;
    }
    if (this.productItem.originalPrice as any === 0) {
      this.productItem.originalPrice = new Price();
      this.productItem.originalPrice.value = 0.0;
    }
  }
  save(event: boolean) {
    this.changed.emit({item: this.productItem, asTemplate: this.asTemplate});
  }
  watchChildren(event: ProductItem) {
    // this.changed.emit(this.productItem);
  }
  getEndPoint(): string {
    if ( this.productItem.productID !== undefined ) {
      return this.service.getImageHandlerEndPoint(this.productItem.productID);
    }
    return '';
  }
  updateImages(event: ProductItem) {
    // console.log('image updated');
    this.galleryChanged.emit({item: this.productItem, asTemplate: false});
  }
}
