import { JsonProperty, JsonObject } from 'json2typescript';
import { TypeContract } from '../../../global/contracts/modules/tag.contract';

export class ProductAttributeType implements TypeContract {
    @JsonProperty('id')
    id: number;
    @JsonProperty('attributeType', String)
    name: string;
}

export class ProductAttribute {

    @JsonProperty('attributeID')
    attributeID: number;

    @JsonProperty('attributeType', String)
    attributeType: String;

    @JsonProperty('attributeLabel')
    attributeLabel: string;

    @JsonProperty('slug', String)
    slug: string;

    variants: ProductVariant[] = [];

    savedAttribute = true;

    constructor(other?: ProductAttribute) {
        if (other !== undefined) {
            this.attributeID = other.attributeID;
            this.attributeType = other.attributeType;
            this.attributeLabel = other.attributeLabel;
            this.savedAttribute = false;
            this.slug = other.slug;
        }
    }
}
export class ProductAttributeFull extends ProductAttributeType {
    public childAttributes: ProductAttribute[] = [];
    constructor() {
        super();
    }
}

@JsonObject
export class ProductVariant {
    @JsonProperty('attributeValueID')
    attributeValueID: number;

    @JsonProperty('productItemId')
    productItemId: number;

    @JsonProperty('attributeID')
    attributeID: number;

    @JsonProperty('attributeType', String)
    attributeType = '';

    @JsonProperty('label', String)
    label = '';

    @JsonProperty('slug', String)
    slug: string;

    @JsonProperty('userDefined')
    userDefined: boolean;

    @JsonProperty('isActive')
    isActive: boolean;

    isNew = true;

    constructor(attr?: ProductAttribute) {
        if (attr !== undefined ) {
            this.attributeID = attr.attributeID;
            this.attributeType = attr.attributeType.toString();
            this.slug = attr.slug;
            this.label = attr.attributeLabel;
        }
    }
}
@JsonObject
export class ProductVariantData {

    @JsonProperty('data', [ProductVariant])
    data: ProductVariant[];
}

