import { GroupByAttributePipe } from './group-by-attribute.pipe';
import { ProductItem } from '../models/product-detail.model';
import { ProductVariant, ProductAttribute } from '../models/product-attribute.model';
import { ProductMockData } from '../../../mocks/data/products/product-mock-data.data';

describe('GroupByAttributePipe', () => {
  const pipe = new GroupByAttributePipe();
  const data = new ProductMockData();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  // Inconsistent result when using fdescribe as opposed to describe
  // Suggest there is an optimisation to be aware of. Leep test until fully diagnosed
  it('Default Item ordered to top when no grouping', () => {
    // console.log(data.products);
    const items = data.products[0].items.data;
    // items = items.sort( (a, b) => a.order - b.order);
    const results = pipe.transform(items, 'Colour');

    expect(results[0].productItemID).toEqual(1);
    expect(results[0].isDefault).toBeTruthy();
    expect(results[1].productItemID).toEqual(3);
    expect(results[2].productItemID).toEqual(2);
    expect(results[3].productItemID).toEqual(4);
  });
  it('Group on material then inserted order', () => {
    const results2 = pipe.transform(data.products[1].items.data, 'Material');
    expect(results2).not.toEqual(data.products[1].items.data);
    expect(results2[2].productItemID).toEqual(data.products[1].items.data[1].productItemID);
    expect(results2.length).toEqual(data.products[1].items.data.length);
  });
});
