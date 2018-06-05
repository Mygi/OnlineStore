import { Injectable, Inject } from '@angular/core';
import { Image } from '../models/image.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { APP_CONFIG } from '../../../app.config';
import { AppConfig } from '../../../global/contracts/config/app-config';
// Rxjs
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ImageHandlerService } from '../../../global/contracts/modules/image.contract';

@Injectable()
export class FileUploadService extends ImageHandlerService {

  constructor(http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    super(config, http);
  }

  public setServiceUrl(config: AppConfig): string {
    return config.baseUrl + config.httpServiceUrls.images + config.defaultDataSuffix;
  }
  public create(image: Image): Observable<Image> {
    return this.http.post<Image>(this.serviceUrl, image);
  }
  public saveAnyFile(image: any, endPoint: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const options = { headers: headers };
    return this.http.post<any>(endPoint, formData, options).pipe(map(
      response => response
    ));
  }
  public saveFile(image: any, endPoint: string, id: number, name?: string): Observable<string> {
    // if( endPoint === 'shop') {
      const url = this.config.baseUrl + this.config.httpServiceUrls.shop + '/' + id + '/image';
      const formData = new FormData();
      formData.append('file', image, name);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      const options = { headers: headers};
    return this.http.post<any>(url, formData, options).pipe(map(
        response => response.url
      ));
    // }
  }
}
