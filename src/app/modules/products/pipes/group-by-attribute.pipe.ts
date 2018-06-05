import { Pipe, PipeTransform } from '@angular/core';
import { ProductItem } from '../models/product-detail.model';

/**
 * Specifically looks for an Attribute Value
 *
 * @export
 * @class GroupByAttributePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'groupByAttribute'
})
export class GroupByAttributePipe implements PipeTransform {

  transform(collection: ProductItem[], property: string, enabled?: boolean): any[] {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!collection) {
      return null;
    }
    if (enabled !== undefined) {
      collection = collection.filter(x => x.isActive === enabled);
      // console.log(collection);
    }
    collection.forEach( value => {
        if ( value.variants.data.findIndex( x => x.attributeType === property) !== -1) {
          value.groupByValue = value.variants.data.find(x => x.attributeType === property).label;
        } else {
          value.groupByValue = 'default';
        }
      }
    );
    const groupByProperty = 'groupByValue';
    const groupedCollection = collection.reduce((previous, current) => {
      if (!previous[current[groupByProperty]]) {
        previous[current[groupByProperty]] = [current];
      } else {
        previous[current[groupByProperty]].push(current);
      }

      return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    // key version const output =  Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
    // console.log(groupedCollection);
    let flatResult: ProductItem[] = [];
    const output = Object.keys(groupedCollection).forEach(
      key =>  flatResult = flatResult.concat( groupedCollection[key].sort( (a, b ) => a.order - b.order ) )
    );
    const index = flatResult.findIndex( x => x.isDefault === true);
    if (index !== -1) {
      const headItem = flatResult[index];
      flatResult.splice(index, 1);
      flatResult.unshift(headItem); // Not sure if call by ref will duplicate or not
    }
    return flatResult;
  }
}
// /**
//  * Default group By
//  * can work on pre-set data
//  * @export
//  * @class GroupByPipe
//  * @implements {PipeTransform}
//  */
// @Pipe({
//   name: 'groupByProperty'
// })
// export class GroupByPropertyPipe implements PipeTransform {

//   transform(collection: ProductItem[], property: string, enabled?: boolean): any[] {
//     // prevents the application from breaking if the array of objects doesn't exist yet
//     if (!collection) {
//       return null;
//     }
//     if ( enabled !== undefined ) {
//       collection = collection.filter( x => x.isActive === enabled);
//       console.log(collection);
//     }
//     console.log(collection);
//     const groupedCollection = collection.reduce((previous, current) => {
//       if (!previous[current[property]]) {
//         previous[current[property]] = [current];
//       } else {
//         previous[current[property]].push(current);
//       }

//       return previous;
//     }, {});

//     // this will return an array of objects, each object containing a group of objects
//     return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
//   }
// }
