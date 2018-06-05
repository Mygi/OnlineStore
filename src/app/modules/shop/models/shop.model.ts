// 3rd party decorator
import { JsonObject, JsonProperty } from 'json2typescript';

// Dependant models
import { CategoryContract } from '../../../global/contracts/modules/category.contract';
import { ShopInterface } from '../../../global/contracts/modules/shop.contract';
import { ImageContract } from '../../../global/contracts/modules/image.contract';
import { Image } from '../../../core/file-handler/models/image.model';
import { CategoryService } from '../../../core/categories/services/category.service';
import { CategoryServiceData } from '../../../core/categories/models/categories.model';
import { Banking } from './banking-model.model';

@JsonObject
export class ShopServiceModel {
    @JsonProperty('shopID')
    shopID: number;

    @JsonProperty('name')
    name: string;

    @JsonProperty('mainImage')
    mainImage: string;

    @JsonProperty('bio')
    bio: string;

    @JsonProperty('creationDate')
    addDate: number;

    @JsonProperty('message')
    message: string;

    @JsonProperty('stallholderProfileID')
    stallholderProfileID: number;

    @JsonProperty('categories', CategoryServiceData)
    categories?: CategoryServiceData;

    @JsonProperty('status')
    status: string;

    categoryOut?: number[];
}

@JsonObject
export class ShopServiceData {
    @JsonProperty('data', ShopServiceModel)
    data: ShopServiceModel;
}
@JsonObject
export class UserShopServiceModel {
    @JsonProperty('shop', ShopServiceData)
    shop: ShopServiceData;

    @JsonProperty('userID')
    userID: number;
}
export class UserShopServiceData {
    @JsonProperty('data', UserShopServiceModel)
    data: UserShopServiceModel;
}
export class Shop implements ShopInterface {

    id: number;

    name: string;

    shopImage: string;

    shopDescription?: string;

    shopOpen: boolean;

    shopCategories: CategoryContract[] = [];

    userId: number;

    shopMessage?: string;

    banking?: Banking;

    stallHolderProfileID?: number;

    constructor() {}

    public bridgeFrom(userId: number, model: ShopServiceModel) {
        this.id = model.shopID;
        this.name = model.name;
        this.shopOpen =  model.status === 'open';
        this.userId = userId;
        this.shopImage = model.mainImage;
        this.shopDescription = model.bio;
        // console.log(model);
        if (model.categories !== undefined) {
            model.categories.data.forEach(
                item => {
                    const tmpCat: CategoryContract = {
                        parentCategoryId:  item.parentCat,
                        id: item.categoryID,
                        name: item.name,
                        depth: item.level

                    };
                    this.shopCategories.push(tmpCat);
                });
        }
        // console.log(this.shopCategories);
        this.shopMessage = model.message;
        this.stallHolderProfileID = model.stallholderProfileID;
    }

    public bridgeTo(): ShopServiceModel {
        const model: ShopServiceModel = {
         shopID: this.id,
         name: this.name,
         status: this.shopOpen ? 'open' : 'closed',
         mainImage: this.shopImage,
         bio: this.shopDescription,
         stallholderProfileID: this.stallHolderProfileID,
         message: this.shopMessage,
         addDate: 0
        };

        const cats: number[] = [];
        // console.log(this.shopCategories);
        this.shopCategories.forEach( item => {
            cats.push(item.id);
            // console.log(item);
        }
        );
        model.categoryOut = cats;
        return model;
    }
}
