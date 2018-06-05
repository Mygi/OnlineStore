import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageProvider } from '../../../global/contracts/services/storage.provider';
import { Exception } from 'handlebars';
import { environment } from '../../../../environments/environment';
import { APP_CONFIG } from '../../../app.config';
import { AppConfig } from '../../../global/contracts/config/app-config';
@Injectable()
export class CookieStorageService extends StorageProvider {

  private _path = '/';
  private _domain = 'localhost';
  private _expires: Date = new Date();
  private _cookieExpiryHours = 24;
  constructor(private storage: CookieService, @Inject(APP_CONFIG) private config: AppConfig ) {
    super();
    this._domain = config.cookieUrl;
    this._path = config.cookiePath;
    this._expires.setHours(this._expires.getHours() + config.cookieExpiryHours);
  }
  public setDomain(domain: string) {
    this._domain = domain;
  }
  /**
   * NB: We could add additional security that parses for
   * insecure content like script references
   *
   * @param {string} keyName
   * @param {string} keyValue
   * @returns {boolean}
   * @memberof CookieStorageService
   */
  public setKeyValue(keyName: string, keyValue: string): boolean {
    if (keyValue == null) {
      return false;
    }
    this.storage.set(keyName, keyValue, this._expires , this._path, this._domain);
      // Second check for ensuring cookie is writeable
      return this.storage.get(keyName) === keyValue;
  }

  /**
   * The Object value wrapper for setting client storage dara
   *
   * @private
   * @param {string} keyName
   * @param {*} keyValue
   * @returns boolean - true if stored otherwise false
   * @memberof ClientStorageService
   */
  public setObjectValue(keyName: string, keyValue: any): boolean {
    // note non-strict comparison allows for null or undefined
    if (keyValue == null) {
      return false;
    }
    return this.setKeyValue(keyName, JSON.stringify(keyValue));
  }

  /**
   * Gets the client stored key valye
   *
   * @private
   * @param {string} keyName
   * @returns {string} null if not found
   * @memberof ClientStorageService
   */
  public getKeyValue(keyName: string): string {
    if (this.hasKey(keyName)) {
      return this.storage.get(keyName);
    }
    return null;
  }

  /**
   * Returns the JSON parsed object
   * May be worth consiudering localised deserialisers
   * for each model
   * @private
   * @param {string} keyName
   * @returns {*} null object if not found
   * @memberof ClientStorageService
   */
  public getKeyObjectValue(keyName: string): any {
    const returnString = this.getKeyValue(keyName);
    try {
      return JSON.parse(returnString);
    } catch (e) {
      return null;
    }
  }
  /**
   * Deletes a key
   * @private
   * @param {string} keyName
   * @returns
   * @memberof ClientStorageService
   */
  public deleteKey(keyName: string) {
    if (this.hasKey(keyName)) {
      this.storage.delete(keyName, this._path, this._domain);
    }
    return;
  }
  public clearData() {
    this.storage.deleteAll(this._path, this._domain);
    // this.storage.deleteAll('/', '/');
    // this.storage.deleteAll();
  }
  public hasKey(keyName: string) {
    return this.storage.check(keyName);
  }
}
