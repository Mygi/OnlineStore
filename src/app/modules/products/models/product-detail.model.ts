import { JsonProperty, JsonObject } from 'json2typescript';
import { ImageContract } from '../../../global/contracts/modules/image.contract';
import { ProductItemSpecification } from './specification.model';
import { ProductVariant, ProductVariantData } from './product-attribute.model';


@JsonObject
export class Currency {
    @JsonProperty('name')
    name: string;
    code: number;

    @JsonProperty('precision')
    precision: number;
    subunit: number;

    @JsonProperty('symbol')
    symbol: string;
    symbol_first: boolean;

    @JsonProperty(' decimal_mark')
    decimal_mark: string;

    @JsonProperty('thousands_separator')
    thousands_separator: string;
    prefix: string;
    suffix: string;
}
@JsonObject
export class Price {
    @JsonProperty('amount')
    amount: number;

    @JsonProperty('value')
    value: number;

    @JsonProperty('currency')
    currency: { [id: string]: Currency};
}

@JsonObject
export class ProductItem {

    @JsonProperty('productItemID')
    productItemID: number;

    @JsonProperty('productID')
    productID: number;

    @JsonProperty('originalPrice', Price)
    originalPrice: Price = new Price();

    @JsonProperty('salePrice', Price)
    salePrice: Price = new Price();

    @JsonProperty('discountPrice', Price)
    discountPrice: Price = new Price();

    @JsonProperty('stock')
    stock: number;

    @JsonProperty('onSale')
    onSale: boolean;

    @JsonProperty('trackInventory')
    trackInventory: boolean;

    @JsonProperty('SKU', String)
    SKU: string;

    @JsonProperty('productImage')
    productImages: ImageContract;

    @JsonProperty('variants', ProductVariantData)
    variants?: ProductVariantData;

    @JsonProperty('isActive')
    isActive = false;

    @JsonProperty('isDefault')
    isDefault = false;

    @JsonProperty('imageURL')
    imageURL: string;

    @JsonProperty('imageID')
    imageID: number;

    @JsonProperty('order')
    order?: number;

    groupByValue?: string;

    @JsonProperty('specifications', {data: [ProductItemSpecification]})
    specifications: {data: ProductItemSpecification[]} = {data: []};
}



