import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { ProductItemSpecification, SpecificationType, SpecificationUnit } from '../../models/specification.model';
import { ProductItem } from '../../models/product-detail.model';
import { ProductItemService } from '../../services/product-item.service';

@Component({
  selector: 'app-product-specifications',
  templateUrl: './product-specifications.component.html',
  styleUrls: ['./product-specifications.component.scss']
})
export class ProductSpecificationsComponent implements OnChanges, OnInit {
  @Output() hasChanged = new EventEmitter<ProductItem>();
  @Input() productItem: ProductItem;

  public specifications: SpecificationType[] = [];
  constructor(private dataService: ProductItemService) { }
  ngOnInit(): void {
   this.dataService.getAllSpecifications().subscribe(
     result => {
       result.forEach ( item => {
         if ( item.units.data.length > 0 ) {
           this.specifications.push(item);
         }
        });
     });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.hasChanged.emit(this.productItem);
  }
  addSpec(specType: any) {
    // console.log(this.productItem);
    // This model is wrong!!!
    const specItem = new ProductItemSpecification(this.productItem.productItemID);
    specItem.type = { data: specType};
    specItem.isVisible = false;
    specItem.unit = {data: specType.units.data[0]};
    specItem.value = '';
    if ( this.productItem.specifications.data.findIndex( x =>
       x.type.data.specificationTypeID === specItem.type.data.specificationTypeID) === -1 ) {
      this.productItem.specifications.data.push(specItem);
    }
    // console.log(this.productItem.specifications);
  }
  canAdd(spec: any): boolean {
    if (spec.units.data.length === 0) {
      return false;
    }
    return !this.specAdded(spec);
  }
  specAdded(specType: any): boolean {
    return this.productItem.specifications.data.findIndex(x =>
      x.type.data.specificationTypeID === specType.specificationTypeID) !== -1;
  }
  deleteSpec(spec: ProductItemSpecification) {
    // console.log(spec);
    const index = this.productItem.specifications.data.findIndex( x =>
         x.type.data.specificationTypeID === spec.type.data.specificationTypeID);
    if ( index !== -1 ) {
      this.productItem.specifications.data.splice(index, 1);
    }
  }
  getUnits(specId: any): SpecificationUnit[] {
    // console.log(specId);
    if ( specId === undefined) {
      return [];
    }
    if ( this.specifications.length === 0 ) {
      return [];
    }
    let id = 0;
    if (specId.type !== null && specId.type !== undefined) {
      id = specId.type.data.specificationTypeID;
    } else {
      id = specId.specificationTypeID;
    }
    return this.specifications.find(x => x.specificationTypeID === id).units.data;
  }
  getSpecificationType(item: any): string {
    if (item === undefined) {
      return '';
    }
    if (this.specifications.length === 0) {
      return '';
    }
    let id = 0;
    if (item.type !== null && item.type !== undefined) {
      id = item.type.data.specificationTypeID;
    } else {
      id = item.specificationTypeID;
    }
    return this.specifications.find(x => x.specificationTypeID === id).value;
  }
}
