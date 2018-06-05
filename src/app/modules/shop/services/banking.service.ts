import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_CONFIG } from '../../../app.config';
import { AppConfig } from '../../../global/contracts/config/app-config';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { BankServiceModel, BanksData, Banking } from '../models/banking-model.model';
import { Shop } from '../models/shop.model';

@Injectable()
export class BankingService {

  private _serviceUrl: string;
  private _shopBankingUrl: string;
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    this._serviceUrl = this.createServiceUrls(config);
   }

  private createServiceUrls(config: AppConfig): string {
    this._shopBankingUrl = config.baseUrl + config.httpServiceUrls.shop;
    return config.baseUrl + config.httpServiceUrls.banks; //  + config.defaultDataSuffix;
  }
  public getBanks(): Observable<BankServiceModel[]> {

    return this.http.get<BanksData>(this._serviceUrl + '?paginate=false').pipe(map(
      bankData => {
        if ( bankData === null) {
          return [];
        }
        return bankData.data;
      }
    ));
  }
  public saveBanking(model: Banking): Observable<any> {
    let data = new HttpParams();
    data = data.append('bankID', model.bankID.toString());
    data = data.append('accountNumber', model.accountNumber.toString());
    data = data.append('bsb', model.bsb.toString());
    data = data.append('accountName', model.accountName);
    return this.http.put(this._shopBankingUrl + '/' + model.shopId + '/bank-account', data).pipe(map (
      result => result
    )) ;
  }
  public createBanking(model: Banking): Observable<any> {
    return this.http.post(this._shopBankingUrl + '/' + model.shopId + '/bank-account', model).pipe(map(
      result => result
    ));
  }
  public getBanking(shopId: number): Observable<any> {
    return this.http.get(this._shopBankingUrl + '/' + shopId + '/bank-account').pipe(map(
      result => {
        return result;
      }
    ));
  }

}
