import { RestfulService, ConcreteRestfulService } from '../services/restful-service.abstract';
import { ListHandler } from '../services/list-handler.interface';
import { TypeContract, TagContract } from './tag.contract';
import { ShopInterface } from './shop.contract';
import { CategoryContract } from './category.contract';
import { ImageContract } from './image.contract';

import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface ProductContract {
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
}

export interface ProductsProvider {
    getProductsForCategoryId( id: number): Observable<ProductContract[]>;
    getProductsForShopId(id: number): Observable<ProductContract[]>;
    getProductsForTagId(id: number): Observable<ProductContract[]>;
    getAll(): Observable<ProductContract[]>;
}
export let PRODUCTS_PROVIDER = new InjectionToken<ProductsProvider>('PRODUCTS_PROVIDER');
