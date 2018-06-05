import { GallerySortPipe } from './gallery-sort.pipe';
import { ProductImage } from '../models/product.model';

describe('GallerySortPipe', () => {
  it('create an instance', () => {
    const pipe = new GallerySortPipe();
    expect(pipe).toBeTruthy();
  });
  it('sorts Images by Order', () => {
    const pipe = new GallerySortPipe();
    const images: ProductImage[] = [];
    const image1: ProductImage = new ProductImage('');
    image1.order = 2;
    image1.caption = 'blah';
    image1.productImageID = 1;
    images.push(image1);

    const image2: ProductImage = new ProductImage('');
    image2.order = 3;
    image2.caption = 'blah';
    image2.productImageID = 2;
    images.push(image2);

    const image3: ProductImage = new ProductImage('');
    image3.order = 1;
    image3.caption = 'blah';
    image3.productImageID = 3;
    images.push(image3);

    const image4: ProductImage = new ProductImage('');
    image4.order = 4;
    image4.caption = 'blah';
    image4.productImageID = 4;
    images.push(image4);

    const result = pipe.transform(images, 'order');

    expect(result[0].productImageID).toEqual(3);
    expect(result.length).toEqual(images.length);
    expect(result[3].productImageID).toEqual(4);
  });
  it('sorts Images by Order and then by Insertion', () => {
    const pipe = new GallerySortPipe();
    const images: ProductImage[] = [];
    const image1: ProductImage = new ProductImage('');
    image1.order = 2;
    image1.caption = 'blah';
    image1.productImageID = 1;
    images.push(image1);

    const image2: ProductImage = new ProductImage('');
    image2.order = 2;
    image2.caption = 'blah';
    image2.productImageID = 2;
    images.push(image2);

    const image3: ProductImage = new ProductImage('');
    image3.order = 1;
    image3.caption = 'blah';
    image3.productImageID = 3;
    images.push(image3);

    const image4: ProductImage = new ProductImage('');
    image4.order = 4;
    image4.caption = 'blah';
    image4.productImageID = 4;
    images.push(image4);

    const result = pipe.transform(images, 'order');

    expect(result[0].productImageID).toEqual(3);
    expect(result.length).toEqual(images.length);
    expect(result[1].productImageID).toEqual(1);
    expect(result[2].productImageID).toEqual(2);
  });
  it('supports negative ordering', () => {
    const pipe = new GallerySortPipe();
    const images: ProductImage[] = [];
    const image1: ProductImage = new ProductImage('');
    image1.order = 2;
    image1.caption = 'blah';
    image1.productImageID = 1;
    images.push(image1);

    const image2: ProductImage = new ProductImage('');
    image2.order = -1;
    image2.caption = 'blah';
    image2.productImageID = 2;
    images.push(image2);

    const image3: ProductImage = new ProductImage('');
    image3.order = 1;
    image3.caption = 'blah';
    image3.productImageID = 3;
    images.push(image3);

    const image4: ProductImage = new ProductImage('');
    image4.order = 4;
    image4.caption = 'blah';
    image4.productImageID = 4;
    images.push(image4);

    const result = pipe.transform(images, 'order');

    expect(result[0].productImageID).toEqual(2);
    expect(result.length).toEqual(images.length);
    expect(result[1].productImageID).toEqual(3);
    expect(result[2].productImageID).toEqual(1);
  });
});
