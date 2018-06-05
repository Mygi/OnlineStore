// A fully typed data store
// models
import { Product, ProductImage } from '../../../modules/products/models/product.model';
import { ShopMock } from '../shop/shop.mock';
import { ImageMock } from '../file/image.mock';
import { ShopInterface } from '../../../global/contracts/modules/shop.contract';
import { CategoryMockData } from '../category/category-mock-data.data';
import { ProductTag } from '../tag/product-tag.mock';
import { Image } from '../../../core/file-handler/models/image.model';
import { ProductItem, Price } from '../../../modules/products/models/product-detail.model';
// tslint:disable-next-line:max-line-length
import { ProductAttribute, ProductAttributeType, ProductVariant, ProductAttributeFull } from '../../../modules/products/models/product-attribute.model';
import { Shop } from '../../../modules/shop/models/shop.model';
import { SpecificationUnit, ProductItemSpecification, SpecificationType } from '../../../modules/products/models/specification.model';

import * as productData from './productSeed.json';


const colors: string[] = ['black', 'blue', 'white', 'red', 'brown', 'orange'];
const sizes: string[] = ['large', 'medium', 'small', 'extra large'];
const sizesOther: string[] = ['6', '8', '10', '12', '14', '16', '18'];

export interface SpecificationAlias {
    label: string;
    abbreviation: string;
}
const mass: SpecificationAlias[] = [
    { label: 'grams', abbreviation: 'grams'},
    { label: 'kilograms', abbreviation: 'kg'}
];

const dimensions: SpecificationAlias[] = [
    { label: 'centimetre', abbreviation: 'cm' },
    { label: 'millimetre', abbreviation: 'mm' },
    { label: 'meter', abbreviation: 'm' },
];
const specifications: { [id: string]: SpecificationAlias[]; } = {
     'weight': mass,
     'dimensions':  dimensions
};
export class ProductMockData {
    public products: Product[] = [];
    constructor() {
        this.products = productData['data'];
    }
}
export class ProductGenerator {
    // should import dependencies!!
    private shops: ShopMock = new ShopMock();
    private images: ImageMock = new ImageMock();
    private categories: CategoryMockData = new CategoryMockData();
    private tags: ProductTag = new ProductTag();
    private n = 10;
    public products: Product[] = [];
    private attributes: ProductAttribute[] = [];
    private specificationUnits: SpecificationUnit[] = [];

    constructor() {
        this.attributes = this.generateAttributeList();
        this.specificationUnits = this.generateSpecifications();
        this.generateProductsForShops();
    }
    private generateAttributeList(): ProductAttribute[]  {
        let attrList: ProductAttribute[] = [];
        attrList = attrList.concat(this.generateAttributes(colors, 'color', 1)).concat(
            this.generateAttributes(sizes, 'sizes', 2)).concat(this.generateAttributes(sizesOther, 'size', 3));
            return attrList;
    }
    public generateAttributeTypes(): ProductAttributeFull[] {

        const attrArray: ProductAttributeFull[] = [];
        const colorType: ProductAttributeFull = {
            id: 1,
            name: 'color',
            childAttributes: this.generateAttributes(colors, 'color', 1)
        };
        const sizesType: ProductAttributeFull = {
            id: 1,
            name: 'sizes',
            childAttributes: this.generateAttributes(sizes, 'sizes', 2)
        };

        const sizeType: ProductAttributeFull = {
            id: 1,
            name: 'sizes',
            childAttributes: this.generateAttributes(sizesOther, 'size', 3)
        };
        attrArray.push(colorType);
        attrArray.push(sizesType);
        attrArray.push(sizeType);

        return attrArray;
    }
    public generateAttributes(strArray: string[], category: string, id: number): ProductAttribute[] {
        let index = 1;
        const productAttr: ProductAttribute[] = [];
        const colorType: ProductAttributeType = {
            id: id,
            name: category
        };
        strArray.forEach(item => {
            const attr = new ProductAttribute();
            attr.attributeLabel = item;
            attr.attributeType = colorType.name;
            attr.attributeID = 1;
            attr.slug = item;
            productAttr.push(attr);
            index++;
        });
        return productAttr;
    }
    private generateProductsForShops(): void {
        let i = 1;
        this.shops.shops.forEach(shop => {
            const range = this.generateRange(this.n);
            range.forEach(index => {
                const product: Product = this.generateProduct(shop, index);
                product.tags = {data: this.tags.tags.filter(x => x.id === this.generateRandomNumber(this.tags.tags.length)) };
                product.productCategories = this.categories.categories.categories.filter(x =>
                    this.generateRandomNumberArray(this.categories.categories.categories.length, 2).some(idx => idx === x.id));
                product.gallery =  { data: this.getImages()};
                product.masterItem = { data: this.generateProductItems(product.productID)[0]};
                product.items = { data: this.generateProductItems(product.productID) };
                product.hasOptions = (product.items.data.length > 1);
                //   console.log(product.productImages);
                this.products.push(product);
            });
            i++;
        });
    }
   public generateProduct(shop: Shop, index: number): Product {
        const id = (index + 1) * index;
        const name = 'Product ' + id;
        const product: Product = new Product(id, name, id.toString(), '');
        product.shopID = shop.id;
        product.shopName = shop.name;
        product.status = 'Draft';
        product.slug = name.replace(' ', '-');
        product.description = 'This is ' + name;
        return product;
    }
    private getImages(): ProductImage[] {
        const images: ProductImage[] = [];
        this.generateRange(2).forEach(index => {
            const tmpId = this.generateRandomNumber(this.images.images.length);
            // console.log(tmpId);
            this.images.images[tmpId].data = undefined;
            const img: ProductImage = new ProductImage(this.images.images[tmpId].remoteUrl);
            images.push(img);
        });
        return images;
    }
    private generateProductItems(id: number): ProductItem[] {
        const items: ProductItem[] = [];
        const range = this.generateRange(this.generateRandomNumber(3) + 1);
        range.forEach(index => {
            items.push(this.generateProductItem(id));
        });
        return items;
    }
    public generatePrice(value: number): Price {
        const price: Price = {
            value: value,
            amount: value * 100,
            currency: {},
        };
        return price;
    }
    public generateProductItem(id: number): ProductItem {
        const item = new ProductItem();
        item.trackInventory = true;
        item.stock = this.generateRandomNumber(100);
        item.originalPrice = this.generatePrice(this.generateRandomNumber(200) + 0.99);
        item.salePrice = this.generatePrice(Math.round(item.originalPrice.value * 0.8) + 0.99);
        item.onSale = false;
        item.SKU = 'sku123';
        item.productID = id;
        item.productItemID = this.generateRandomNumber(10000);
        item.variants = {'data': this.getVariants(item.productItemID)};
        item.productImages = this.getImages().pop();
        item.specifications = { data: this.getSpecificationArray(item.productItemID)};
        return item;
    }
    private getVariants(id: number): ProductVariant[] {
        const attributes = this.getRandomFilteredTypeArray<ProductAttribute>(2, this.attributes);
        const variants: ProductVariant[] = [];
        let index = 1;

        attributes.forEach(attr => {
            variants.push(this.convertAttributeToVariant(attr, index, id));
            index++;
        });
        return variants;
    }
    private convertAttributeToVariant(attr: ProductAttribute, index: number, id: number): ProductVariant {
        const variant: ProductVariant = new ProductVariant(attr);
        variant.productItemId = id;
        variant.attributeValueID = index;
        return variant;
    }
    public getSpecificationArray(id: number): ProductItemSpecification[] {
        const units = this.getRandomFilteredTypeArray <SpecificationUnit>(2, this.specificationUnits);
        const productItemSpec: ProductItemSpecification[] = [];
        units.forEach( spec => {
            const item: ProductItemSpecification = new ProductItemSpecification(id);
            item.unit = {data: spec};
            item.type = {data: new SpecificationType() };
            item.value = this.generateRandomNumber(150).toString();
            productItemSpec.push(item);
        });
        return productItemSpec;
    }
    public generateSpecifications(): SpecificationUnit[] {
        const specUnits: SpecificationUnit[] = [];
        let i = 1;
        let j = 1;
       Object.keys(specifications).forEach( key => {
           const value = specifications[key];
           const spec: SpecificationType = new SpecificationType();
           spec.specificationTypeID = i;
           spec.isActive = false;
           spec.userDefined = false;
           spec.value = key;
           spec.units = { data: specUnits};

           value.forEach( val => {
               const specOption: SpecificationUnit = {
                   unit: val.abbreviation,
                   specificationUnitID: j,
                   userDefined: false,
                   isActive: true
               };
               specUnits.push(specOption);
            j++;
           });
           i++;
       });
       return specUnits;
    }
    private getRandomFilteredTypeArray<T>(length: number, input: T[]): T[] {
        const result: T[] = [];
        this.generateRange(length).forEach(index => {
            const tmpId = this.generateRandomNumber(input.length);
            result.push(input[tmpId]);
        });
        return result;
    }
    private generateRandomNumber(length: number): number {
        return Math.floor(Math.random() * length );
    }
    private generateRandomNumberArray(length: number, elements: number) {
        const range = this.generateRange(elements);
        const result: number[] = [];
        range.forEach( key => {
            result.push(this.generateRandomNumber(length));
        });
        return result;
    }
    private generateRange(size: number): number[] {
        return Array.from(Array(size).keys());
    }
}
