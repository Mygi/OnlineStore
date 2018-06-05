import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../../../../core/file-handler/models/image.model';
import { ProductImage } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ImageContract } from '../../../../global/contracts/modules/image.contract';
import { MessageService } from '../../../../core/fk-forms/services/message.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {
  @Input() images: ProductImage[] = [];
  @Input() endPoint = '';
  @Output() updated = new EventEmitter<{deleted: boolean, image: ImageContract}>();
  public editing: number;
  private _draggingItem: ProductImage;
  private _draggingIndex = -1;
  private reorderedImages: ProductImage[] = [];
  display = false;
  display2 = false;
  displayImage = '';
  displayCaption = '';
  constructor(private service: ProductService, private messageService: MessageService) { }

  ngOnInit() {
  }
  changeEditing(state: boolean, index: number) {
    this.editing = state ?  index : undefined;
  }
  isEditing(index: number): boolean {
    return this.editing === index;
  }
  updateImages(event: ImageContract) {
    // console.log(event);
    const productImage = new ProductImage(event.getUrl());
    productImage.url = event.getUrl();
    productImage.order = this.images.length - 1;
    this.images.push(productImage);
    this.updated.emit({deleted: false, image: event});
    this.display = false;
  }
  deleteImage(image: ProductImage): void {
    this.service.deleteProductImage(image.productImageID).subscribe(
      result => this.updated.emit({deleted: true, image: image}),
      error => this.messageService.sendErrorMessage('Error', 'Failed to delete image')
    );
  }
  updateImage(image: ProductImage): void {
    // console.log(image);
    this.service.updateProductImage(image).subscribe(
      result => this.updated.emit({ deleted: false, image: image })
    );
  }
  startDrag(item: ProductImage, index: number) {
    this._draggingItem = item;
    this._draggingIndex = index;
    // console.log(this.images);
  }
  swap(item: ProductImage, dropIndex: number) {
    // console.log(this.images);
    item.order = this._draggingIndex;
    this._draggingItem.order = dropIndex;
    this.reorderedImages.push(item);
    this.reorderedImages.push(this._draggingItem);
    // console.log(this.reorderedImages);
    this.images[dropIndex] = this._draggingItem;
    this.images[this._draggingIndex] = item;
    this._draggingItem = null;
    this._draggingIndex = -1;
    // let i = 0;
    // for (i = 0; i < this.images.length; i++) {
    //   this.images[i].order = i;
    // }
    // console.log(this.images);
    this.images.forEach( x => {
      if ( this.reorderedImages.findIndex( y => y.productImageID === x.productImageID) === -1 ) {
        this.reorderedImages.push(x);
      }
    });
    // console.log(this.reorderedImages);
    this.service.updateProductImageOrder(this.reorderedImages, item.productID).subscribe(
        result => {
          this.reorderedImages = [];
          this.updated.emit({ deleted: false, image: item });
        });
  }
}
