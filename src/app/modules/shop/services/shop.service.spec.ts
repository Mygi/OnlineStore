import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ShopService } from './shop.service';
import { APP_CONFIG, FKConfig } from '../../../app.config';
import { MocksModule } from '../../../mocks/mocks.module';
import { Shop, UserShopServiceModel, UserShopServiceData, ShopServiceData, ShopServiceModel } from '../models/shop.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BankingServiceData, BankingServiceModel } from '../models/banking-model.model';

describe('ShopService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      providers: [ShopService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', inject([ShopService], (service: ShopService) => {
    expect(service).toBeTruthy();
  }));
  it('should get correct URL', inject([ShopService], (service: ShopService) => {
    expect(service.getImageHandlerEndPoint(1)).toBe('http://localhost:4444/assets/testData/shop/1/image');
  }));
  it('should save a shop to memory', inject([ShopService], (service: ShopService) => {
    const shop = new Shop();
    shop.id = 1;
    service.updateShop(shop);
    expect(service.hasLocalStorageShop()).toBeTruthy();
    expect(service.getLocalShop().id).toBe(shop.id);
    service.clearShop();
    expect(service.hasLocalStorageShop()).toBeFalsy();
  }));
  it('should retrieve a shop', inject([ShopService], (service: ShopService) => {
    const shop: ShopServiceModel = new ShopServiceModel();
    shop.shopID = 1;
    shop.name = 'test name';
    shop.stallholderProfileID = 1;
    const shopdata: ShopServiceData = { data: shop  };
    const model: UserShopServiceModel = { shop: shopdata, userID: 1 };
    const data: UserShopServiceData = {
      data: model
    };

    const banking: BankingServiceData = { data: new BankingServiceModel()};
    service.getUserShop(1).subscribe(
      result => {
        expect(result.id).toEqual(1);
        expect(result.userId).toBe(1);
        expect(result.banking).toBeDefined();
        expect(result.name).toEqual('test name');
      });

    const req = httpTestingController.expectOne('http://localhost:4444/assets/testData/private/users/1');
    expect(req.request.method).toEqual('GET');
    req.flush(data);

    const req2 = httpTestingController.expectOne('http://localhost:4444/assets/testData/shop/1/bank-account');
    expect(req2.request.method).toEqual('GET');
    req2.flush(banking);

  }));
});
