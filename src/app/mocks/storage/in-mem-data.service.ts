import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, RequestInfoUtilities, RequestCore } from 'angular-in-memory-web-api';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';

// rxjs
import { Observable, Subject } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
 import { map } from 'rxjs/operators';

// products
import { Product, ProductBridge } from '../../modules/products/models/product.model';
import { FeaturedItem } from '../../modules/public/models/featured-item.model';
import { ProductMockData, ProductGenerator } from '../data/products/product-mock-data.data';
import { FeaturedProductMockData } from '../data/featured/featured-product-mock-data.data';
import { ProductTag } from '../data/tag/product-tag.mock';

// categories
import { CategoryMockData } from '../data/category/category-mock-data.data';
import { Category } from '../../core/categories/models/categories.model';
import { CategoryList } from '../../core/categories/models/category-list.model';

// security
import { AuthMock } from '../data/security/auth-mock.data';
import { AuthUser, Auth } from '../../modules/security/models/auth-user.model';
import { AuthUserMock } from '../data/security/auth-user-mock.data';

// shop
import { ShopMock } from '../data/shop/shop.mock';
import { Shop } from '../../modules/shop/models/shop.model';

// Files
import { ImageMock } from '../data/file/image.mock';
import { Image } from '../../core/file-handler/models/image.model';

// Tags
import { Tag } from '../../core/tags/models/tag.model';
import { ProductContract } from '../../global/contracts/modules/products.contract';
import { ProductAttributeFull } from '../../modules/products/models/product-attribute.model';


@Injectable()
export class InMemDataService implements InMemoryDbService {

  database: {
    products: Product[], category: Category[], featuredProducts: FeaturedItem[],
              auth: Auth[], authUser: AuthUser[], shop: Shop[], image: Image[], tags: Tag[],
              shopProduct: ProductContract[], attributes: ProductAttributeFull[] }
    = {
      products: [], category: [], featuredProducts: [], auth: [], authUser: [],
      shop: [], image: [], tags: [], shopProduct: [], attributes: [] };

  createDb(): {} | Observable<{ products: Product[], categoryList: CategoryList }>
                 | Promise<{ products: Product[], categoryList: CategoryList }> {
    return this.database;
  }
  constructor() {
    const products          = new ProductMockData();
    const categories        = new CategoryMockData();
    const featuredProducts  = new FeaturedProductMockData();
    const authUsers         = new AuthUserMock();
    const auth              = new AuthMock();
    const shop              = new ShopMock();
    const imageMock         = new ImageMock();
    const tagMock           = new ProductTag();

    this.database.products          = products.products;
    this.database.category          = categories.categories.categories;
    this.database.featuredProducts  = featuredProducts.featuredProducts;
    this.database.auth              = auth.authUsers;
    this.database.authUser          = authUsers.authUsers;
    this.database.shop              = shop.shops;
    this.database.image             = imageMock.images;
    this.database.tags              = tagMock.tags;

    const generator: ProductGenerator = new ProductGenerator();
    this.database.attributes = generator.generateAttributeTypes();

    const shopProducts: ProductBridge[] = [];
    products.products.forEach( product => {
      const item = new ProductBridge(product);
      shopProducts.push(item);
    });
    this.database.shopProduct = shopProducts;
  }

  post(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    // console.log(collectionName);
    if (collectionName === 'auth') {
      return this.login( reqInfo );
    }
    if (collectionName === 'products') {
      return this.createProduct( reqInfo);
    }
    if ( collectionName === 'image') {
      return this.handleFileUpload(reqInfo);
    }
    return undefined; // let the default POST handle all others
  }

  // get(req: RequestInfo) {
  //   console.log(req);
  //   return undefined;
  // }
  put(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'products') {
      return this.updateProduct(reqInfo);
    }
  }
  private updateProduct(reqInfo: RequestInfo): Observable<any> {
    const options: ResponseOptions = {};
    return reqInfo.utils.createResponse$(() => {
      const postReq = (<any>reqInfo.req);
      // console.log(postReq);
      if (postReq.body) {
        const product: Product = postReq.body;

        const index = this.database.products.findIndex(x => product.productID === x.productID);
        this.database.products[index] = product;

        const shopIndex = this.database.shopProduct.findIndex(x => x.productID === product.productID );
        this.database.shopProduct[shopIndex] = new ProductBridge(product);

        options.body = product;
        options.status = 200;
        // image.remoteUrl = image.data.
      } else {
        options.status = 400;
        options.body = 'Error - service is invalid';
      }
      return options;
    });
  }
  private createProduct(reqInfo: RequestInfo): Observable<any> {
    const options: ResponseOptions = {};
    return reqInfo.utils.createResponse$(() => {
      const postReq = (<any>reqInfo.req);
      if (postReq.body) {
        const product: Product = postReq.body;
        const id = this.database.products.length + 1;
        product.productID = id;
        this.database.products.push(product);
        this.database.shopProduct.push(new ProductBridge(product));
        options.body = product;
        options.status = 200;
        // image.remoteUrl = image.data.
      } else {
        options.status = 400;
        options.body = 'Error - service is invalid';
      }
      return options;
    });
  }
  /**
   * Handle file uplaods
   *
   * @private
   * @param {RequestInfo} reqInfo
   * @returns {Observable<any>}
   * @memberof InMemDataService
   */
  private handleFileUpload(reqInfo: RequestInfo): Observable<any> {
    const options: ResponseOptions = {};
    return reqInfo.utils.createResponse$(() => {
      const postReq = (<any>reqInfo.req);
      if ('data' in postReq.body) {
        const image: Image = postReq.body;
        // console.log(image);
        image.data = image.data['changingThisBreaksApplicationSecurity'];
        let remoteUrl = 'https://dummyimage.com/400x400/';
        remoteUrl = remoteUrl + Math.floor(Math.random() * 16777215).toString(16) + '/';
        remoteUrl = remoteUrl + Math.floor(Math.random() * 16777215).toString(16) + ',gif&text=';
        remoteUrl = remoteUrl + image.caption;
        image.remoteUrl = remoteUrl;
        this.database.image.push(image);
        // image.remoteUrl = image.data.
        options.status = 200;
        options.body = image;
      } else {
        options.status = 401;
        options.body = { error: 'not Supported' };
      }
      return options;
    });
  }


  /**
   * Handle login mock requests
   *
   * @private
   * @param {RequestInfo} reqInfo
   * @returns {Observable<any>}
   * @memberof InMemDataService
   */
  private login(reqInfo: RequestInfo): Observable<any> {
    let options: ResponseOptions;
    return reqInfo.utils.createResponse$( () => {
      const postReq = (<any>reqInfo.req);
      if ('email' in postReq.body && 'password' in postReq.body) {
        const username = postReq.body.email;
        const password = postReq.body.password;
        const auth = reqInfo.collection.find(x => x.email === username && x.password === password);

        // we'll need to take Auth and return token in Header

        options = auth ?
        {
          body: auth,
          status: 200
        } : {
          status: 401,
          body: {error: 'Error - not found' }
        };
      } else {
        options.status = 400;
        options.body = 'Error - service is invalid';
      }
      return options;
    });
  }
  // Performs after initial work done
  // intercept ResponseOptions from default HTTP method handlers
  // add a response header and report interception to console.log
  // responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
  //   // const collectionName = reqInfo.collectionName;
  //   // if (collectionName === 'auth' && reqInfo.method === 'post') {
  //   //   const postReq = (<any>reqInfo.req);
  //   //   if ('username' in postReq.body && 'password' in postReq.body) {
  //   //     const username = postReq.body.username;
  //   //     const password = postReq.body.password;
  //   //     const auth = reqInfo.collection.find(x => x.username === username && x.password === password);
  //   //     if ( auth ) {
  //   //       resOptions.body = auth;
  //   //       resOptions.status = 200;
  //   //     } else {
  //   //       resOptions.status = 401;
  //   //       resOptions.body = 'Error - not found';
  //   //     }
  //   //   } else {
  //   //     resOptions.status = 400;
  //   //     resOptions.body = 'Error - service is invalid';
  //   //   }
  //   //   console.log(resOptions);
  //   // }
  //   //   return resOptions;

  //   // }
}

