// core
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

// Central
import { AppConfig } from '../../../global/contracts/config/app-config';
import { APP_CONFIG } from '../../../app.config';

// Model
import { FeaturedItem } from '../models/featured-item.model';


@Injectable()
export class FeaturedItemService {

  serviceUrl: string;
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    this.serviceUrl = config.baseUrl + config.httpServiceUrls.featuredProducts + config.defaultDataSuffix;
  }

  public getFeaturedItems(): Observable<any> {
    return this.http.get<{data: any}>( this.serviceUrl ).pipe(map(
      result => result.data
    ));
  }
}
