import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ProductVariant, ProductAttributeFull, ProductAttribute, ProductAttributeType } from '../../models/product-attribute.model';
import { Product } from '../../models/product.model';
import { ProductItemService } from '../../services/product-item.service';
import { ProductItem } from '../../models/product-detail.model';
import { ProductService } from '../../services/product.service';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss']
})
export class ProductAttributesComponent implements OnInit, OnDestroy {

  @Input() attributeList: ProductAttribute[] = [];
  @Input() selectedVariants: ProductVariant[][] = [];
  @Input() savedVariants: ProductVariant[][] = [];
  public availableAttributes: ProductAttribute[] = [];
  @Input() product: Product;
  @Output() itemsCreated = new EventEmitter<boolean>();
  message = '';
  private stateSubscription: Subscription;
  constructor(private service: ProductItemService, private productService: ProductService) { }

  ngOnInit() {
    this.getAttributes();
    this.stateSubscription = this.productService.appState.subscribe(
      state => {
        if (state === 'synced') {
          this.loadAttributes();
        }
      });
    this.loadAttributes();
   // this.attributeList = this.service.getVariants(this.product.masterItem.data);
  }
  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }
  loadAttributes() {
    this.savedVariants = [];
    if (this.product.items === undefined ) {
      return;
    }
    if (this.product.items.data.length > 0) {
      this.attributeList = this.service.getVariants(this.product.items.data);
      this.selectedVariants = [];
      for (let index = 0; index < this.attributeList.length; index++) {
        this.savedVariants[index] = this.attributeList[index].variants;
      }
    }
  }

  // This will need to get the full list - otherwise this will fail!!!
  getAttributes() {
    this.service.getAll().subscribe(
      attributes => this.availableAttributes = attributes
      // Used if we want to clear additions - prevent by default.
      // .filter( x => this.attributeList.findIndex( y => y.attributeID === x.attributeID) === -1 );
    );
  }
  getAttributesForType(id: number): ProductVariant[] {
    const attr = this.availableAttributes.find( x => x.attributeID === id);
    return (attr !== undefined) ? attr.variants : [];
    // get Values
    // return this.service.getVariantsForAttibuteType(id);
  }

  updateTags(event: ProductVariant, index: number) {
    if (this.savedVariants.length === 0 ) {
      event.isNew = true;
      return;
    }
    if ( this.savedVariants[index] === undefined ) {
      event.isNew = true;
      return;
    }
    if (this.savedVariants[index].findIndex( x => x.attributeValueID === event.attributeValueID) !== -1) {
      const selIndex = this.selectedVariants[index].findIndex(x => x.attributeValueID === event.attributeValueID);
      this.selectedVariants[index].splice(selIndex, 1);
      this.message = 'Can not add an existing option value';
    }
  }
  addOption(item: ProductAttribute) {
    // const attr = new ProductAttribute(item);
    item.savedAttribute = false;
    this.attributeList.push(item);
  }
  removeAttributeList(item: ProductAttribute) {
    const index = this.attributeList.findIndex(x => x.attributeID === item.attributeID);
    if (index !== -1 ) {
      // console.log(this.attributeList[index].savedAttribute);
      if (!this.attributeList[index].savedAttribute) {
        this.attributeList.splice(index, 1);
      }
    }
  }
  notAdded(item: ProductAttribute): boolean {
    return (this.attributeList.findIndex(x => x.attributeID === item.attributeID ) === -1);
  }
  generateVariants() {
    if ( this.savedVariants.length === 0) {
      this.service.generateVariants(this.selectedVariants, this.product.productID);
    } else {
      // console.log(this.savedVariants);
      this.service.generateAdditionalVariants(this.selectedVariants, this.product.productID, this.savedVariants,
         this.product.items.data.length);
    }
    // console.log(this.service.getProductItems());
    this.product.items.data = this.product.items.data.concat(this.service.getProductItems());
    this.itemsCreated.emit(true);
  }

  allowNewAttributes(): boolean {
    if ( this.attributeList.length >= this.availableAttributes.length) {
      return false;
    }
    return this.savedVariants.length === 0;
  }

  allowDelete(): boolean {
    return (this.savedVariants.length === 0);
  }

}
