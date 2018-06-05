import { Pipe, PipeTransform } from '@angular/core';
import { ProductItem } from '../models/product-detail.model';
import { ProductAttribute } from '../models/product-attribute.model';

@Pipe({
  name: 'productItemList'
})
export class ProductItemListSortPipe implements PipeTransform {

  transform(value: ProductItem[], args?: any): any {
    return value.sort( function( a, b) {
      return a.order - b.order;
   });
  }
}
