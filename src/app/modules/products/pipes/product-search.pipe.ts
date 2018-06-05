import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(items: Product[], searchText: string, orderBy?: string, ascending?: boolean, start?: number, end?: number): any {
    if (!items) {
      return [];
    }
    if (!searchText) {
      if ( orderBy !== undefined ) {
        items = items.sort( (a, b) => {
            if ( orderBy in a ) {
              if ( ascending ) {
                return a[orderBy] < b[orderBy] ? -1 : 1;
              } else {
                return a[orderBy] < b[orderBy] ? 1 : -1;
              }
            }
            return 0;
          });
      }
    }
    searchText = searchText.toLowerCase();

    if (orderBy !== undefined) {
      items = items.filter(it => {
        return it.description.toLowerCase().includes(searchText) || it.title.toLowerCase().includes(searchText);
      }).sort((a, b) => {
        if (orderBy in a) {
          if (ascending) {
            return a[orderBy] < b[orderBy] ? -1 : 1;
          } else {
            return a[orderBy] < b[orderBy] ? 1 : -1;
          }
        }
        return 0;
      });
    } else {
      items = items.filter(it => {
      return it.description.toLowerCase().includes(searchText) || it.title.toLowerCase().includes(searchText);
      });
    }
    if ( end !== undefined ) {
      return items.slice(start, end);
    }
    return items;
  }

}
