import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs';

// why is map so whacky?
import { map, catchError, switchMap} from 'rxjs/operators';

// models
import { CategoryContract } from '../../../global/contracts/modules/category.contract';
import { Shop, ShopServiceModel, ShopServiceData, UserShopServiceData } from '../models/shop.model';

// Central
import { AppConfig } from '../../../global/contracts/config/app-config';
import { APP_CONFIG } from '../../../app.config';
import { StorageProvider } from '../../../global/contracts/services/storage.provider';
import { BankingServiceData, Banking } from '../models/banking-model.model';
import { FormDataService } from '../../../core/fk-forms/services/form-data.service';
import { CategoryService } from '../../../core/categories/services/category.service';
import { ShopProvider } from '../../../global/contracts/modules/shop.contract';

@Injectable()
export class ShopService implements ShopProvider {

  private shopCategories: CategoryContract[];
  private inSync: Boolean = false;
  private serviceUrl: string;
  private shopStorageKey = 'shop';
  private _shopUserUrl = '';
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig,
              private storageProvider: StorageProvider, private dataService: FormDataService,
              private categoryService: CategoryService) {
    this.serviceUrl =  this.createServiceUrls(config);
    this._shopUserUrl = config.baseUrl + config.httpServiceUrls.shopForUser + config.defaultDataSuffix;
  }

  private createServiceUrls(config: AppConfig): string {
    return config.baseUrl + config.httpServiceUrls.shop + config.defaultDataSuffix;
  }
  // Observable!
  public getUserShop(userId: number): Observable<Shop> {
    // http
    return this.http.get<UserShopServiceData>(this._shopUserUrl + '/' + userId).pipe(switchMap(
      data => {
        const shop = new Shop();
        shop.bridgeFrom(userId, data.data.shop.data);
        // shop.shopCategories = shop.shopCategories.map (cat =>  this.categoryService.mapServiceData(cat) );
        return this.getBankingDetails(shop);
      }));
  }

  public getBankingDetails(shop: Shop): Observable<Shop> {
    // console.log(this.serviceUrl + '/' + shop.id + '/bank-account');
    return this.http.get<BankingServiceData>(this.serviceUrl + '/' + shop.id + '/bank-account').pipe(map(
      data => {
        if (data === null) {
          return shop;
        } else {
          const banking = new Banking();
          banking.bridgeFrom(data.data);
          shop.banking = banking;
          return shop;
        }
      },
      error => {
        return shop;
      }
    ));
  }
  /**
   * Get data from storage Provider
   *
   * @returns {Shop}
   * @memberof ShopService
   */
  public getLocalShop(): Shop {
    return this.storageProvider.getKeyObjectValue(this.shopStorageKey);
  }

  public hasLocalStorageShop(): boolean {
    return this.storageProvider.hasKey(this.shopStorageKey);
  }
  public getImageHandlerEndPoint(id: number) {
    return this.config.baseUrl + this.config.httpServiceUrls.shop + '/' + id + '/image';
  }
  /**
   * Not sure when to call this method.
   *
   * @returns {Boolean}
   * @memberof ShopService
   */
  public isInSync(): Boolean {
    return this.inSync;
  }
  // To local storage
  public updateShop(shop: Shop) {
    this.storageProvider.setObjectValue(this.shopStorageKey, shop);
  }

  /**
   * Fron local storage to remote
   *
   * @memberof ShopService
   */
  public synchroniseShop(shop: Shop): Observable<null | Shop> {
    this.clearShop();
    const shopServiceData = shop.bridgeTo();
    shopServiceData['shopName'] = shop.name;
    // console.log(shopServiceData);
    let body = this.dataService.convertFields(shopServiceData);
    let i = 0;
    shopServiceData.categoryOut.forEach( item => {
      body = body.append('categories[' + i + ']', item.toString());
      i++;
    });
    if (shop.id === 0) {
      return this.http.put<Shop>(this.serviceUrl, body);
    } else {
      // console.log('putting ' + JSON.stringify(shop));
      return this.http.put<ShopServiceData>(this.serviceUrl + '/' + shop.id, body).pipe(map(
        data => {
          const tmpShop = new Shop();
          tmpShop.bridgeFrom(shop.userId, data.data);
          return tmpShop;
        }
      ));
    }
  }

  /**
   * Should remove from local storage
   *
   * @memberof ShopService
   */
  public clearShop() {
    this.storageProvider.deleteKey(this.shopStorageKey);
  }
}
