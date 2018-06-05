import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Image } from '../../../../core/file-handler/models/image.model';
import { ProductItem } from '../../models/product-detail.model';
import { ImageContract } from '../../../../global/contracts/modules/image.contract';
import { ProductImage } from '../../models/product.model';

@Component({
  selector: 'app-product-item-image',
  templateUrl: './product-item-image.component.html',
  styleUrls: ['./product-item-image.component.scss']
})
export class ProductItemImageComponent implements OnChanges, OnInit {

  @Input() productItem: ProductItem = new ProductItem();
  @Output() hasChanged = new EventEmitter<ProductItem>();
  @Input() endPoint = '';
  @Input() gallery: ImageContract[] = [];
  selectedImageID = 0;
  constructor() { }

  ngOnInit() {
    this.selectedImageID = this.productItem.imageID;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.hasChanged.emit(this.productItem);
  }
  saveImage(image: ImageContract) {
    console.log(image);
    this.productItem.imageURL = image.getUrl();
    this.productItem.imageID = image.getId();
    this.hasChanged.emit(this.productItem);
  }
  navigateToTile(image: ProductImage) {
    // console.log('clicked');
    this.productItem.imageURL = image.url;
    this.productItem.imageID = image.productImageID;
    this.selectedImageID = image.productImageID;
    this.hasChanged.emit(this.productItem);
  }
 }
