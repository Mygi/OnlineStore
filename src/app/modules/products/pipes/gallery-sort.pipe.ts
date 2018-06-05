import { Pipe, PipeTransform } from '@angular/core';
import { ProductImage } from '../models/product.model';

@Pipe({
  name: 'gallerySort'
})
export class GallerySortPipe implements PipeTransform {

  transform(value: ProductImage[], orderBy?: string): any {
    return value.sort((a, b) => a.order - b.order);
  }

}
