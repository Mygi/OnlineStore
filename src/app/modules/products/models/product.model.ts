import { ProductItem, Price } from './product-detail.model';
import { JsonProperty, JsonObject } from 'json2typescript';
import { ShopInterface } from '../../../global/contracts/modules/shop.contract';
import { TagContract } from '../../../global/contracts/modules/tag.contract';
import { CategoryContract } from '../../../global/contracts/modules/category.contract';
import { ImageContract } from '../../../global/contracts/modules/image.contract';
import { ProductContract } from '../../../global/contracts/modules/products.contract';
import { Tag } from '../../../core/tags/models/tag.model';

export class ProductImage implements ImageContract {


  @JsonProperty('caption')
  caption: string;

  @JsonProperty('productImageID')
  productImageID: number;

  @JsonProperty('url', String)
  url: string;

  @JsonProperty('order')
  order: number;

  @JsonProperty('productID')
  productID: number;

  constructor(url?: string) {
    this.url = url;
  }
  getId(): number {
    return this.productImageID;
  }
  getUrl(): string {
    return this.url;
  }
}

export class ProductItemServiceData {
  @JsonProperty('data', [ProductItem])
  data: ProductItem[];
}
export class Product {
  get name(): string {
    return this.title;
  }
  @JsonProperty('productID')
  public productID: number;

  @JsonProperty('shopID')
  public shopID: number;

  @JsonProperty('shopName')
  public shopName: string;

  @JsonProperty('title', String)
  public title: string;

  @JsonProperty('slug', String)
  public slug: string;

  @JsonProperty('description', String)
  public description: string;

  @JsonProperty('productOrder')
  public productOrder?: number;

  @JsonProperty('status')
  public status?: string;

  public hasOptions: boolean;

  @JsonProperty('items', ProductItemServiceData)
  public items?: ProductItemServiceData;

  @JsonProperty('masterItem', { data: ProductItem })
  public masterItem?: {data: ProductItem} = {data: undefined};

  @JsonProperty('tags', { data: [Tag] })
  public tags: {data: Tag[]} = {data: []};

  @JsonProperty('productCategories')
  public productCategories?: CategoryContract[] = [];

  public tagProduct = false;

  @JsonProperty('gallery', {data: [ProductImage]})
  gallery: { data: ProductImage[] } = { data: [] };

  constructor(id?: number, title?: string, slug?: string,
                description?: string) {
    this.productID = id;
      this.title = title;
      this.slug = slug;
      this.description = description;
    }
  }

@JsonObject
export class ProductBridge implements ProductContract {

  @JsonProperty('productID')
  productID: number;

  @JsonProperty('shopID')
  shopID: number;

  @JsonProperty('shopName')
  shopName: string;

  @JsonProperty('title')
  title?: string;

  @JsonProperty('slug')
  slug: string;

  @JsonProperty('description')
  description: string;

  originalPrice?: number;

  discountPrice?: number;

  stock?: number;

  trackInventory?: boolean;

  @JsonProperty('mainImage')
  mainImage?: string;

  @JsonProperty('createdData')
  createdData?: string;

  @JsonProperty('productOrder')
  productOrder?: number;

  secondaryImageUrl?: string;

  onSale?: boolean;

  tagProduct?: boolean;

  name: string;

  inventoryString?: string;

  variants: number;

  priceString = '';

  totalStock = 0;

  maxPrice = 0;

  private _placeHolderImage = 'https://screenshotlayer.com/images/assets/placeholder.png';

  constructor( input: Product) {
        this.shopID = input.shopID;
    this.productID = input.productID;
        this.slug = input.slug;
        this.description = input.description;
        this.name = input.title;
        this.title = input.title;
        this.originalPrice = this.getOriginalPrice(input);
        this.discountPrice = this.getDiscountPrice(input);
        this.onSale = this.getOnSale(input);
        this.stock = this.getStock(input);
        this.trackInventory = this.getTrackInventory(input);
        this.mainImage = this.getImageUrl(input);
        this.secondaryImageUrl = this.getSecondaryImageUrl(input);
        this.shopName = input.shopName;
        this.inventoryString = this.getInventoryString(input);
        this.variants = this.getVariants(input);
        if (this.mainImage === '') {
          this.mainImage = this._placeHolderImage;
        }
  }
  public getVariants(input: Product): number {
    if (input.items !== undefined) {
      return input.items.data.length;
    }
    return 1;
  }
  public getInventoryString(input: Product): string {
    let sumStock = 0;
    let items = 0;
    if (input.items !== undefined) {
      if (input.items.data.length > 0 ) {
        items = input.items.data.length;
        input.items.data.forEach(
          item => sumStock += item.stock
        );
      }
      this.totalStock = sumStock;
      return sumStock + ' in ' + items + ' variation' + ((items > 1) ? 's' : '');
    } else if (input.masterItem !== undefined ) {
        return input.masterItem.data.stock.toString();
    }
    return '0';
  }
  public getOriginalPrice(input: Product): number {
  if (input.masterItem !== undefined) {
    if (input.masterItem.data.originalPrice === undefined) {
      this.priceString = '$0.00';
      return 0.0;
    }
    this.priceString = '$' + this.getPrice(input.masterItem.data.originalPrice);
    return this.getPrice(input.masterItem.data.originalPrice);
  } else {
    if ( input.items !== undefined ) {
      if (input.items.data.length > 0 ) {
        if (input.items.data.length === 1 ) {
          this.priceString = '$' + this.getPrice(input.items.data[0].originalPrice);
          return input.items.data[0].originalPrice.value;
        }
        const sortedList = input.items.data.sort( function(a, b) { return a.originalPrice.value - b.originalPrice.value; });
        this.priceString = '$' + this.getPrice(sortedList[0].originalPrice);
        this.maxPrice = this.getPrice(sortedList[0].originalPrice);
        if (this.getPrice(sortedList[sortedList.length - 1].originalPrice) !== 0.0
            && (this.getPrice(sortedList[0].originalPrice) !== this.getPrice(sortedList[sortedList.length - 1].originalPrice))) {
          this.maxPrice = this.getPrice(sortedList[sortedList.length - 1].originalPrice);
          this.priceString = this.priceString + ' - $' + this.getPrice(sortedList[sortedList.length - 1].originalPrice);
        }
        return this.getPrice(sortedList[sortedList.length - 1].originalPrice);
      }
    }
  }
  return 0.00;
}
private getPrice(price: Price): number {
  if (price.value === undefined) {
    return 0.0;
  }
  return price.value;
}
  public getDiscountPrice(input: Product): number {
    if (input.masterItem !== undefined) {
      if (input.masterItem.data.discountPrice === undefined) {
        return 0.0;
      }
      return input.masterItem.data.discountPrice.value;
    }
  return 0.00;
}

  public getStock(input: Product): number {
    if (input.masterItem !== undefined) {
      if (input.masterItem.data.stock === undefined) {
        return 0;
      }
      return input.masterItem.data.stock;
    }
  return 0;
}

  public getTrackInventory(input: Product): boolean {
    if (input.masterItem !== undefined) {
      if (input.masterItem.data.trackInventory === undefined) {
        return false;
      }
      return input.masterItem.data.trackInventory;
    }
  return false;
}

  public getImageUrl(input: Product): string {
  if (input.gallery !== undefined) {
    return input.gallery.data[0].url;
  } else if (input.masterItem !== undefined) {
      if (input.masterItem.data.imageURL === undefined) {
        return this._placeHolderImage;
      }
    return input.masterItem.data.imageURL;
  } else if ( input.items !== undefined) {
    if (input.items.data.length > 0 ) {
      return input.items.data[0].imageURL === null ? this._placeHolderImage : input.items.data[0].imageURL;
    }
  }
  return this._placeHolderImage;
}

  public getSecondaryImageUrl(input: Product): string {
  if (input.gallery !== undefined) {
    return input.gallery.data[1].url;
  } else if (input.masterItem !== undefined) {
    if (input.masterItem.data.imageURL === undefined) {
      return '';
    }
    return input.masterItem.data.imageURL;
  }
  return '';
}
  public getOnSale(input: Product): boolean {
    if (input.masterItem !== undefined) {
      if (input.masterItem.data.onSale === undefined) {
        return false;
      }
      return input.masterItem.data.onSale;
    }
  return false;
  }

}

export class ShopProductServiceData {
  @JsonProperty('data', [Product])
  data: Product[];

}
