import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class FormDataService {

  constructor() { }

  convertFields(modelData: any): HttpParams {
    let item = new HttpParams();
    Object.keys(modelData).forEach(key => {
      item = item.append(key, modelData[key]);
    });
    return item;
  }
  public convertToFormData(modelData: any): FormData {
    const data = new FormData();
    Object.keys(modelData).forEach(key => {
      data.append(key, modelData[key]);
    });
    return data;
  }

}
