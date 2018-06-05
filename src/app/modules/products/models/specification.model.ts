import { JsonProperty, JsonObject } from 'json2typescript';
import { TypeContract } from '../../../global/contracts/modules/tag.contract';

@JsonObject
export class SpecificationUnit {
    @JsonProperty('unit')
    unit: string;

    @JsonProperty('specificationUnitID')
    specificationUnitID: number;

    @JsonProperty('isActive')
    isActive: boolean;

    @JsonProperty('userDefined', Boolean)
    userDefined: Boolean;

    constructor() {
        this.unit = '';
        this.isActive = true;
    }
}
@JsonObject
export class SpecificationType {
    @JsonProperty('value')
    value: string;
    @JsonProperty('specificationTypeID')
    specificationTypeID: number;
    @JsonProperty('userDefined', Boolean)
    userDefined: Boolean;
    @JsonProperty('isActive', Boolean)
    isActive: Boolean;

    @JsonProperty('units', {data: [SpecificationUnit]})
    units: { data: SpecificationUnit[] } = {data: [] };
    constructor() {
        this.value = '';
    }
}


@JsonObject
export class ProductItemSpecification {
    @JsonProperty('specificationID')
    specificationID: number;

    @JsonProperty('type', { data: SpecificationType})
    type: { data: SpecificationType};

    @JsonProperty('productItemID')
    productItemID: number;

    @JsonProperty('unit', { data: SpecificationUnit})
    unit: { data: SpecificationUnit };

    isVisible: boolean;

    @JsonProperty('value')
    value: string;

    constructor(productItemId: number) {
        this.productItemID = productItemId;
        this.value = '';
    }
}

@JsonObject
export class ProductItemSpecificationData {
    @JsonProperty('specification', [ProductItemSpecification])
    data: ProductItemSpecification[];
}

