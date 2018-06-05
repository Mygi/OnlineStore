import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { Type } from '@angular/core';

export interface ISerialisable {
    deserialiseJson(json: string, objectType: any);
    serialiseJson(data: any);
}
/**
 * A (nearly) purely abstract class becuase interfaces are somewaht useless
 * in Angular's Dependency Injection strategy. Annoying because I
 * can see a great candidate for making a storageProivder implement
 * an Observable Interface for allowing subscription based models
 * I would want to inject an Observable variant of my storage Accessor
 * But I can't - meaning I now need to create some class just for
 * Obeservables and build a class Heirarchy around it.
 * @export
 * @abstract
 * @class StorageProvider
 */
export abstract class StorageProvider implements ISerialisable {

    jsonConvert: JsonConvert;

    constructor() {
        this.jsonConvert = new JsonConvert();
    }
    /**
     * Set a key/string value pair
     * @param {string} keyName
     * @param {string} keyValue
     * @returns {boolean}
     * @memberof StorageProvider
     */
    abstract setKeyValue(keyName: string, keyValue: string): boolean;
    /**
     * The Object value wrapper for setting client storage dara
     *
     * @private
     * @param {string} keyName
     * @param {*} keyValue
     * @returns boolean - true if stored otherwise false
     * @memberof ClientStorageService
     */
    abstract setObjectValue(keyName: string, keyValue: any);
    /**
     * Gets the client stored key valye
     *
     * @private
     * @param {string} keyName
     * @returns {string} Empty string if not found
     * @memberof ClientStorageService
     */
    abstract getKeyValue(keyName: string): string;
    /**
     * Returns the JSON parsed object
     * May be worth consiudering localised deserialisers
     * for each model
     * @private
     * @param {string} keyName
     * @returns {*} null object if not found
     * @memberof ClientStorageService
     */
    abstract getKeyObjectValue(keyName: string);
    /**
     * Deletes a key
     * @private
     * @param {string} keyName
     * @returns
     * @memberof ClientStorageService
     */
    abstract deleteKey(keyName: string);

    abstract clearData();

    public deserialiseJson(json: string, objectType: any) {
        return this.jsonConvert.deserialize(json, objectType);
    }
    public serialiseJson(data: any) {
        this.jsonConvert.serialize(data);
    }
    public abstract hasKey(keyName: string);
    public abstract setDomain(domain: string);
}
