// Core
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Rxjs
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';

// Central
import { AppConfig } from '../../../global/contracts/config/app-config';
import { APP_CONFIG } from '../../../app.config';

// Models
import { CategoryList } from '../models/category-list.model';
import { CategoryProvider, CategoryContract } from '../../../global/contracts/modules/category.contract';
import { Category, CategoryServiceData } from '../models/categories.model';

@Injectable()
export class CategoryService extends CategoryProvider {

  constructor(http: HttpClient, @Inject(APP_CONFIG) config: AppConfig ) {
    super(config, http);
  }

  // move this to a base class
  public setServiceUrl(config: AppConfig): string {
    return config.baseUrl + config.httpServiceUrls.categories + config.defaultDataSuffix;
  }

  public getServiceUrl(): string {
    return this.serviceUrl + '?include=children&level=1&paginate=false' ;
  }
  public getAll(): Observable<CategoryContract[]> {
    return this.getCategories();
  }
  public getCategories(): Observable<Category[]> {
    return this.http.get<CategoryServiceData>(this.serviceUrl + '?include=children&level=1&paginate=false' ).pipe(map(
      result => {
        if ( result.data === undefined ) {
          return [];
        }
        return result.data.map( cat => {
          return this.mapServiceData(cat);
        });
      }));
  }
  public mapServiceData(cat: any): Category {
    let parentId = 0;
    if (cat.parentCat) {
      parentId = cat.parentCat.id;
    }
    const category: Category = new Category(cat.categoryID,
      parentId,
      cat.name,
      cat.description,
      cat.slug,
      cat.imageURL,
      []);
      category.depth = cat.level;
    if (cat.childCategory !== undefined ) {
      cat.childCategory.data.forEach( x =>
        category.subCategories.push(this.mapServiceData(x))
       );
    } else if ( cat.children ) {
      cat.children.data.forEach(x =>
        category.subCategories.push(this.mapServiceData(x))
      );
    }
    return category;
  }
}
