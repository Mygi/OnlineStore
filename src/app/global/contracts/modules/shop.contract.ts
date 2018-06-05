import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryContract } from './category.contract';

export interface ShopInterface {
    id: number;
    name: string;
    userId: number;
    shopOpen: boolean;
    shopCategories: CategoryContract[];
}
export interface ShopProvider {
    getUserShop(userId: number): Observable<ShopInterface>;
}
export let SHOP_PROVIDER = new InjectionToken<ShopProvider>('SHOP_PROVIDER');
