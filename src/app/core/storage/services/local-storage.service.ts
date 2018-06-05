import { StorageProvider } from '../../../global/contracts/services/storage.provider';

export class LocalStorageService extends StorageProvider  {
private _domain: string;
    /**
 * A generalised function for setting Key Value pairs in client
 * storage locations. Could add client side cache as well
 * @private
 * @param {string} keyName
 * @param {string} keyValue
 * @returns {boolean} true if stored otherwise false
 * @memberof ClientStorageService
 */
    public setKeyValue(keyName: string, keyValue: string): boolean {
        if (keyValue == null) {
            return false;
        }
        try {
            localStorage.setItem(keyName, keyValue);
            return true;
        } catch (e) {
            return false;
        }
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
    public setObjectValue(keyName: string, keyValue: any) {
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
     * @returns {string} Empty string if not found
     * @memberof ClientStorageService
     */
    public getKeyValue(keyName: string): string {
        try {
            return localStorage.getItem(keyName);
        } catch (e) {
            return '';
        }
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
        try {
            localStorage.removeItem(keyName);
        } catch (e) {
            return;
        }
    }

    /**
     * Deletes all storage
     *
     * @memberof LocalStorageService
     */
    public clearData() {
        localStorage.clear();
    }

    public hasKey(keyName: string) {
        return localStorage.getItem(keyName) !== null;
    }
    public setDomain(domain: string) {
        this._domain = domain;
    }
}
