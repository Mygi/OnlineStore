import { ProductContract } from '../../../global/contracts/modules/products.contract';

export class WishlistProducts implements ProductContract {
    productID: number;
    shopID: number;
    shopName?: string;
    title?: string;
    slug: string;
    description: string;
    originalPrice?: number;
    discountPrice?: number;
    stock?: number;
    trackInventory?: boolean;
    mainImage?: string;
    secondaryImageUrl?: string;
    onSale?: boolean;
    tagProduct?: boolean;
    selected: boolean;
}
export class Wishlist {
    public products: WishlistProducts[] = [];
    public userId: number;
    constructor( userId: number ) {
        this.userId = userId;
    }
}
