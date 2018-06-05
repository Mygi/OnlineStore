// Core
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// rxjs
import { Observable ,  BehaviorSubject } from 'rxjs';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';

// Central
import { AppConfig } from '../../../global/contracts/config/app-config';
import { APP_CONFIG } from '../../../app.config';

// Models
import {Product, ProductBridge, ShopProductServiceData, ProductImage} from '../models/product.model';
import { ProductContract, ProductsProvider } from '../../../global/contracts/modules/products.contract';
import { ProductItem } from '../models/product-detail.model';
import { ProductVariant } from '../models/product-attribute.model';
import { Image } from '../../../core/file-handler/models/image.model';

// Inheritance by contract
import { ConcreteRestfulService } from '../../../global/contracts/services/restful-service.abstract';

// Models from core - should use contraact which suggest we don;t have it right yet.
import { CategoryServiceData } from '../../../core/categories/models/categories.model';
import { Tag } from '../../../core/tags/models/tag.model';
import { CategoryContract } from '../../../global/contracts/modules/category.contract';

// Services from Core  also suggest we may not have it right yet
import { CategoryService } from '../../../core/categories/services/category.service';
import { FormDataService } from '../../../core/fk-forms/services/form-data.service';

@Injectable()
export class ProductService extends ConcreteRestfulService<ProductContract> implements ProductsProvider  {


  // TODO: Make this a development environment setting to be injected
  private _shopProductsUrl: string;
  private _privateProductsUrl: string;
  private _privateProductsItemUrl: string;
  private _privateProductsImagesUrl: string;
  public appState = new BehaviorSubject<string>('clean');
  constructor(http: HttpClient, @Inject(APP_CONFIG)  config: AppConfig, private categoryService: CategoryService,
              private dataService: FormDataService  ) {
    super(config, http);
   }

  public getProductsForCategoryId(id: number): Observable<ProductContract[]> {
    return this.http.get<ProductContract[]>(this.serviceUrl + '/category/' + id);
  }
  public getProductsForShopId(id: number): Observable<ProductContract[]> {
    return this.http.get<ShopProductServiceData>(this._shopProductsUrl + '/' + id + '/products?paginate=false&include=items').pipe(map(
      body => body.data.map(item => {
        return new ProductBridge(item);
      })
    ));
  }
  public getProductsForTagId(id: number): Observable<ProductContract[]> {
    return this.http.get<ShopProductServiceData>(this.serviceUrl + '/tag/' + id).pipe(map(
      body => body.data
    ));
  }

  public setServiceUrl(config: AppConfig): string {
    this._shopProductsUrl = config.baseUrl + config.httpServiceUrls.shop;
    this._privateProductsItemUrl = config.baseUrl + 'private/product-items';
    this._privateProductsImagesUrl = config.baseUrl + 'private/product-images';
    this._privateProductsUrl = config.baseUrl + config.httpServiceUrls.privateProducts;
    return config.baseUrl + config.httpServiceUrls.products + config.defaultDataSuffix;
  }

  public getProductGallery(id: number): Observable<Product> {
    return this.http.get<{ data: Product }>(this.serviceUrl + '/' + id + '?include=gallery').pipe(map(
      prod => prod.data
    ));
  }

  public getPublicProduct(id: number): Observable<Product> {
    return this.http.get<{ data: Product }>(this.serviceUrl + '/' + id + '?include=gallery,items').pipe(map(
      prod => prod.data
    ));
  }
  public getProduct(id: number): Observable<Product> {
    let product: Product = new Product();
    return this.http.get<CategoryServiceData>(this._privateProductsUrl + '/' + id + '/categories').pipe(switchMap(
      categories => {
        const cats = categories.data.map(
          cat => this.categoryService.mapServiceData(cat)
        );
        // return this.http.get<Tag[]>(this._privateProductsUrl + '/' + id + '/tags').switchMap
        // ( tagData => {
        //     const tgs = tagData;
            return this.http.get<{data: Product}>(this.serviceUrl + '/' + id + '?include=gallery,tags,items').pipe(map(
              prod => {
                product = prod.data;
                // product.productTags = tgs;
                product.productCategories = cats;
                this.appState.next('synced');
                return product;
              }));
            // });
          }));
  }
   // We need to think about the map function a little more - we can just use a proper model inside product!
   // TS vs JS issue here!!
   public getAll(): Observable<ProductContract[]> {
      return this.http.get<{data: Product[]}>(this.serviceUrl + '?include=gallery').pipe(map( response => {
          return response.data.map( item => {
            return new ProductBridge(item);
          });
      }));
   }
   public createProduct(product: Product, shopId: number): Observable<Product> {
     return this.http.post<{data: Product}>(this._shopProductsUrl + '/' + shopId + '/products', product).pipe(map(
       result => result.data
     ));
   }
   /**
    * Save a product
    * @param product
    */
  public saveProduct(product: Product): Observable<Product> {
    let data = new HttpParams();
    data = data.append('title', product.title);
    data = data.append('description', product.description);
    return this.http.put<Product>(this._privateProductsUrl + '/' + product.productID, data);
  }
  /**
   * Should this be done on the tags service?
   * @param tags
   * @param productId
   */
  public saveTags(tags: Tag[], productId: number): Observable<Tag[]> {
    const body = new FormData();
    let i = 0;
    // console.log(tags);
    tags.forEach(
      tag => {
        // console.log(tag);
        body.append('tags[' + i + ']', tag.name);
        i++;
      }
    );
    // if (tags.length === 0) {
    //   body.append('tags', 'false');
    // }
    return this.http.post<{data: [Tag]}>(this._privateProductsUrl + '/' + productId + '/tags', body).pipe(map(
      result => {
        if ( result.data === undefined) {
          return [];
        }
        return result.data;
      }));
  }
  public saveCategories(cats: CategoryContract[], productId: number): Observable<Tag[]> {
    const body = new FormData();
    let i = 0;
    cats.forEach(
      cat => {
        if (cat.id !== undefined) {
          body.append('categoryIDs[' + i + ']', cat.id.toString());
        } else {
          body.append('categoryIDs[' + i + ']', cat['categoryID'].toString());
        }
        i++;
      }
    );
    return this.http.post<{ data: [Tag] }>(this._privateProductsUrl + '/' + productId + '/categories', body).pipe(map(
      result => result.data
    ));
  }
  public getImageHandlerEndPoint(id: number) {
    return this._privateProductsUrl + '/' + id + '/images/upload';
  }
  /**
   * This needs to be done on a model I think
   * @param item
   */
  public createProductItem(item: ProductItem): Observable<ProductItem> {

    const data = new FormData();
    data.append('SKU', item.SKU);
    data.append('trackInventory', this.convertBooleanToString(item.trackInventory));
    data.append('onSale', this.convertBooleanToString(item.onSale));
    data.append('isActive', this.convertBooleanToString(item.isActive));
    data.append('isDefault', this.convertBooleanToString(item.isDefault));
    data.append('order', item.order.toString());
    if (item.originalPrice.value !== undefined) {
      data.append('originalPrice', item.originalPrice.value.toString());
    } else {
      data.append('originalPrice', '0.00');
    }
    if (item.originalPrice.value !== undefined) {
      data.append('discountPrice', item.discountPrice.value.toString());
    } else {
      data.append('discountPrice', '0.00');
    }
    if (item.variants !== undefined) {
      let i = 0;
      item.variants.data.forEach(
        variant => {
          // console.log(variant);
          if (variant.attributeID !== undefined) {
            data.append('variants[' + i + '][attributeID]', variant.attributeID.toString());
            data.append('variants[' + i + '][attributeValueID]', variant.attributeValueID.toString());
            i++;
          }
        }
      );
    }
    return this.http.post<{data: ProductItem}>(this._privateProductsUrl + '/' + item.productID + '/product-items', data).pipe(map(
      result => { this.appState.next('creating'); return result.data; }
    ));
  }

  /**
   * Also should be done pon Product Item Model
   * @param item
   */
  public saveProductItem(item: ProductItem): Observable<ProductItem> {
    // console.log(item);
    let data = new HttpParams();
    data = data.append('SKU', item.SKU);
    data = data.append('trackInventory', this.convertBooleanToString(item.trackInventory) );
    data = data.append('onSale', this.convertBooleanToString(item.onSale));
    data = data.append('isActive', this.convertBooleanToString(item.isActive));
    data = data.append('isDefault', this.convertBooleanToString(item.isDefault));
    if ( item.originalPrice.value !== undefined) {
      data = data.append('originalPrice', item.originalPrice.value.toString());
    } else {
      data = data.append('originalPrice', '0.00');
    }
    if ( item.discountPrice.value !== undefined ) {
      data = data.append('discountPrice', item.discountPrice.value.toString());
    } else {
      data = data.append('discountPrice', '0.00');
    }
    data = data.append('stock', item.stock.toString());
    data = data.append('imageURL', item.imageURL);
    data = data.append('order', item.order.toString());
    if (item.imageID !== null && item.imageID !== 0) {
      data = data.append('imageID', item.imageID.toString());
    }
    if (item.variants !== undefined) {
      let i = 0;
      item.variants.data.forEach(
        variant => {
          // console.log(variant);
          if (variant.attributeID !== undefined) {
            data = data.append('variants[' + i + '][attributeID]', variant.attributeID.toString());
            data = data.append('variants[' + i + '][attributeValueID]', variant.attributeValueID.toString());
            i++;
          }
        }
      );
    }

    if (item.specifications.data !== undefined) {
      let i = 0;
      item.specifications.data.forEach(
        spec => {
          if ( spec['type'] !== undefined) {
            data = data.append('specifications[' + i + '][specificationTypeID]', spec['type'].data.specificationTypeID.toString());
            data = data.append('specifications[' + i + '][value]', spec.value);
            data = data.append('specifications[' + i + '][isVisible]', '1');
            data = data.append('specifications[' + i + '][specificationTypeUnitID]', spec['unit'].data.specificationUnitID.toString());
            i++;
          }
        }
      );
    }
    return this.http.put<{ data: ProductItem }>(this._privateProductsItemUrl + '/' + item.productItemID, data).pipe(map(
      result => { this.appState.next('updating'); return result.data; }
    ));
  }
  public deleteProductItem(id: number): Observable<boolean> {
    return this.http.delete(this._privateProductsItemUrl + '/' + id).pipe(map(
      response => { this.appState.next('deletingItem'); return true; }
    ));

  }
  private convertBooleanToString(value: Boolean): string {
    return value ? '1' : '0';
  }
  public deleteProductImage(imageID: number): Observable<any> {
    return this.http.delete(this._privateProductsImagesUrl + '/' + imageID, { responseType: 'text' }).pipe(map(
      data => { this.appState.next('deleteImage'); return data; }));
  }
  public updateProductImage(image: ProductImage): Observable<ProductImage> {
    let data = new HttpParams();
    data = data.append('caption', image.caption);
    data = data.append('order', image.order.toString());
    return this.http.put<{data: ProductImage}>(this._privateProductsImagesUrl + '/' + image.productImageID, data).pipe(map(
      result => { this.appState.next('updateImages'); return result.data; }
    ));

  }
  public updateProductImageOrder(images: ProductImage[], id: number): Observable<any> {
    let data = new HttpParams();
    let i = 0 ;
    images.forEach( img => {
      data = data.append('imageOrder[' + i + '][productImageID]', img.productImageID.toString());
      data = data.append('imageOrder[' + i + '][order]', img.order.toString());
      i++;
    });
    return this.http.post<any>(this._privateProductsUrl + '/' + id + '/images/order', data).pipe(map(
      result => { this.appState.next('updateImageOrdering'); return result.data; }
    ));

  }
}
