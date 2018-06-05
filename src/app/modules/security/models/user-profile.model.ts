import { UserProfileContract } from '../../../global/contracts/modules/user.contract';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Shop, ShopServiceModel } from '../../shop/models/shop.model';

@JsonObject
export class UserProfile implements UserProfileContract {

    userID: number;

    shop: Shop;

    emailAaddress: string;

    constructor(id?: number) {
        this.userID = id;
    }
    copyFrom(data: UserProfile) {
        this.shop = data.shop;
        this.userID = data.userID;
        this.emailAaddress = data.emailAaddress;
    }
    getImageUrl(): string {
        if (this.shop !== undefined ) {
            return this.shop.shopImage;
        }
        return '';
    }
    getShopId(): number {
        if (this.shop !== undefined) {
            return this.shop.id;
        }
        return 0;
    }
    getShop(): Shop {
        return this.shop;
    }
}

export class UserProfileServiceData {
    @JsonProperty('userID')
    userID: number;

    @JsonProperty('shop', { data: ShopServiceModel })
    shop: { data: ShopServiceModel };

    @JsonProperty('emailAaddress')
    emailAaddress: string;


}
export class UserProfileService {
    data: UserProfileServiceData;
}
