import { Injectable, Inject } from '@angular/core';
import { ProductAttributeFull, ProductAttribute, ProductVariant } from '../models/product-attribute.model';
import { ConcreteRestfulService } from '../../../global/contracts/services/restful-service.abstract';
import { AppConfig } from '../../../global/contracts/config/app-config';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../app.config';
import { Observable } from 'rxjs';
import { ProductItem, Price } from '../models/product-detail.model';
import { Image } from '../../../core/file-handler/models/image.model';
import { ProductItemSpecification, SpecificationType } from '../models/specification.model';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
@Injectable()
export class ProductItemService extends ConcreteRestfulService<ProductAttribute> {

  private _productItems: ProductItem[] = [];
  private _specificationUrl: string;

  private _hashedAttrMap: { [key: number]:  ProductVariant[] } = {};
  private _oldHashedAttrMap: { [key: number]: ProductVariant[] } = {};
  private _generatedIndex = 1;
  constructor(http: HttpClient, @Inject(APP_CONFIG) config: AppConfig) {
    super(config, http);
  }
  public getAll(): Observable<ProductAttribute[]> {
    return this.http.get<{data: ProductAttribute[]}>(this.serviceUrl + '/?include=values').pipe(map(
     response => {
       const attrArray: ProductAttribute[] = [];
      return response.data.map( item => {
        item.variants = item['values'].data;
        return item;
      });
    }));
  }
  public getAllSpecifications(): Observable<SpecificationType[]> {
    return this.http.get<{ data: SpecificationType[] }>(this._specificationUrl + '?include=units').pipe(map(
      response => response.data
    ));
  }
  public setServiceUrl(config: AppConfig): string {
    this._specificationUrl = config.baseUrl + config.httpServiceUrls.specifications;
    return config.baseUrl + config.httpServiceUrls.attributes + config.defaultDataSuffix;
  }

  /**
   * Concept is the difference of two cross prodocts
   * So generate the Cross Product of [Saved(i), New(i)] x [Saved(i+1), New(i+1)] x... [Saved(i+n), New(i+n)]
   * So generate the Cross Product of [Saved(i)] x [Saved(i+1)] x... [Saved(i+n)]
   * Hash Unique IDs for each set - subtract the difference
   * @param attrMatrix
   * @param id
   * @param savedMatrix
   */
  public generateAdditionalVariants(attrMatrix: ProductVariant[][], id: number, savedMatrix: ProductVariant[][],
     initialIndex?: number): ProductItem[] {
    // If models don't match we break a constraint. Can't add a new attribute
    // Probably throw an exception
    this._oldHashedAttrMap = {};
    this._hashedAttrMap = {};
    this._productItems = [];
    if ( attrMatrix.length > savedMatrix.length ) {
      return [];
    }
    const concatMatrix: ProductVariant[][] = [];
    // Concat Arrys [all] x [all]
    for (let index = 0; index < savedMatrix.length; index++) {
      if (attrMatrix[index] === undefined) {
        concatMatrix[index] = savedMatrix[index];
      } else {
        concatMatrix[index] = attrMatrix[index].concat(savedMatrix[index]);
      }
    }
    // all
    this.recursePermutations<ProductVariant, ProductVariant[]>(concatMatrix, permutation =>
      this.generateVariantMap(permutation, true ));

    // old
    this.recursePermutations<ProductVariant, ProductVariant[]>(savedMatrix, permutation =>
      this.generateVariantMap(permutation, false));

    const filteredMatrix: ProductVariant[][] = [];
      // console.log(concatMatrix);
      // console.log(this._hashedAttrMap);
      // console.log(this._oldHashedAttrMap);
    for (const key of Object.keys(this._hashedAttrMap)) {
      if (this._oldHashedAttrMap[key] === undefined) {
        filteredMatrix.push(this._hashedAttrMap[key]);
      }
    }
    const productItems: ProductItem[] = [];
    this._generatedIndex = initialIndex;
    // console.log(filteredMatrix);
    filteredMatrix.forEach( variations =>
      productItems.push(this.generateDefaultProductItem(id, false, variations, false))
    );
    return productItems;
  }
  /**
   * Generates hash map for existing set of variants
   * @param permutation
   * @param isAll
   */
  generateVariantMap(permutation: ProductVariant[], isAll: boolean): ProductVariant[] {
     isAll ? this._hashedAttrMap[this.generateHash(permutation)] = permutation :
             this._oldHashedAttrMap[this.generateHash(permutation)] = permutation;
     return permutation;
  }

  /**
   * The hashing logic is the sum of Unuique IDs * the product of Unique IDs
   * The proof for uniqueness of any set of distinct positive integers where all
   * sets contain the same count of numbers
   * [2,3,4] => 24 * 9 = 212
   * f(a,b,c) = (a*b*c) * (a+b+c) ^ (a !=b && b!=c && a !=c)
   * f(a,b,c,n) = (a*b*c..*n) * (a+b+c..+n) ^ (a !=b && b!=c && a !=c ... a!=n, b!=n, c!=n ... n-1!=n)
   * @param permutation
   */
  generateHash(permutation: ProductVariant[]): number {
    let sum = 0;
    let product = 1;
    permutation.forEach(variant => {
      sum += variant.attributeValueID;
      product = sum * product;
    });
    return sum * product;
  }

  /**
   * Generate variants for a set of new ProductItems
   * Arguably the Variant based approach from above is better
   * @param attrMatrix
   * @param id
   */
  public generateVariants(attrMatrix: ProductVariant[][], id: number): ProductItem[] {
    this._productItems = [];
    this._generatedIndex = 1;
    const filteredMatrix: ProductVariant[][] = [];
    attrMatrix.forEach( row =>
      filteredMatrix.push(row.filter( x => x.isNew))
    );
    const productItems: ProductItem[] = [];

    this.recursePermutations<ProductVariant, ProductItem>(filteredMatrix, permutation =>
        this.generateDefaultProductItem(id, false, permutation, false) );
    this._productItems[0].isDefault = true;
    return productItems;
  }

  /**
   * Generic Recursive permutation function
   * Generates the cross product of Each Row against one another
   * @template T
   * @template K
   * @param {T[][]} arrOfArrays
   * @param {(permutation: T[]) => K} callback
   * @param {number} [i=0]
   * @param {T[]} [previousElements=[]]
   * @memberof ProductItemService
   */
  public recursePermutations<T, K>(arrOfArrays: T[][], callback: (permutation: T[]) => K, i: number = 0,
    previousElements: T[] = []) {
    if (i < arrOfArrays.length) {
      const currentElements = arrOfArrays[i];
      for (const element of currentElements) {
        this.recursePermutations(arrOfArrays, callback, i + 1, previousElements.concat(element));
      }
      if (currentElements.length < 1) {
        this.recursePermutations(arrOfArrays, callback, i + 1, Array.from(previousElements));
      }
    } else if (previousElements.length > 0) {
      callback(previousElements);
    }
  }
  public createVariant(attribute: ProductAttribute): ProductVariant {
    return new ProductVariant(attribute);
  }
  public getProductItems(): ProductItem[] {
    return this._productItems;
  }
  /**
   * So this also needs to go in a model
   * @param productId
   * @param withDefaultVariants
   * @param attribuetArray
   */
  public generateDefaultProductItem(productId: number, withDefaultVariants: boolean, attribuetArray?: ProductVariant[],
     isMaster?: boolean): ProductItem {
       if (isMaster === undefined ) {
         isMaster = false;
       }
    const item: ProductItem = {
      productItemID: 0,
      productID: productId,
      variants: {data: []},
      productImages: this.generateDefaultImage(),
      specifications: {data: []},
      originalPrice: new Price(),
      salePrice: new Price(),
      discountPrice: new Price(),
      SKU: 'default',
      trackInventory: false,
      stock: 0,
      onSale: false,
      isActive: true,
      isDefault: isMaster,
      imageURL: '',
      imageID: 0,
      order: this._generatedIndex
    };
    if (withDefaultVariants) {
      item.variants = {data: this.generateDefaultVariant()};
    } else if (attribuetArray !== undefined ) {
      const variantList: ProductVariant[] = [];
      attribuetArray.forEach(attr =>
        variantList.push(attr)
      );
      item.variants = {data: variantList};
      item.groupByValue = item.variants.data[0].attributeType;
      this._productItems.push(item);
    }
    this._generatedIndex++;
    return item;
  }
  private generateDefaultVariant(): ProductVariant[] {
    return [ new ProductVariant() ];
  }
  private generateDefaultImage(): Image {
    return new Image('');
  }
  getVariantsForAttibuteType(id: number): Observable<ProductVariant[]> {
    return this.http.get<{data: ProductVariant[]}>(this.serviceUrl + '/' + id + '/values').pipe(map(
      result => result.data
    ));
  }
  /**
   * Take a 2d tuple array of [ProductItem][Variants]
   * and translate it back to a 2D array of
   * [ProductAttribute][ProductAttributeValues]
   * @param productItems
   */
  public getVariants(productItems: ProductItem[]): ProductAttribute[] {
    const attributesTypes: ProductAttribute[] = [];
    productItems.forEach(item => {
      item.variants.data.forEach(variant => {
        // console.log(variant);
        // RETURN WHEN MODEL SORTED
        variant.isNew = false;
        if (attributesTypes.findIndex(x => x.attributeID === variant.attributeID) === -1) {
          // console.log(attributesTypes);
          const attr = new ProductAttribute();
          attr.attributeLabel = variant.attributeType;
          attr.attributeID = variant.attributeID;
          attr.attributeType = variant.attributeType;
          attr.variants = [];
          attr.variants.push(variant);
          attributesTypes.push(attr);
          attr.savedAttribute = true;
        } else {
          const index = attributesTypes.findIndex(x => x.attributeID === variant.attributeID);
          const childIndex = attributesTypes[index].variants.findIndex(x => x.attributeValueID === variant.attributeValueID);
          if (childIndex === -1) {
            attributesTypes[index].variants.push(variant);
          }
        }
      });
    }
    );
    return attributesTypes;
  }

  // get Specification Types with Units

  // Save Variants

  // Save Item
}
