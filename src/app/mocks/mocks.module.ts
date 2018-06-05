import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationProvider } from '../global/contracts/services/authentication.provider';
import { ProductsProvider, PRODUCTS_PROVIDER } from '../global/contracts/modules/products.contract';
import { CategoryHandler, CategoryProvider } from '../global/contracts/modules/category.contract';
import { AuthProviderMock } from './services/auth-provider.mock';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';
import { APP_CONFIG } from '../app.config';
import { MockConfig } from './config/mock.config';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FKBrowserModule } from '../global/fk-browser/fk-browser.module';
import { CoreInterfaceModule } from '../core/core-interface/core-interface.module';
import { InMemDataService } from './storage/in-mem-data.service';
import { CategoryService } from '../core/categories/services/category.service';
import { ProductService } from '../modules/products/services/product.service';
import { CategoryHandlerService } from '../core/categories/services/category-handler.service';
import { StorageProvider } from '../global/contracts/services/storage.provider';
import { LocalStorageService } from '../core/storage/services/local-storage.service';
import { MessageService } from '../core/fk-forms/services/message.service';

// Set up a single import module replete with necessary mocking of items in the global scope
export function mockToken() {
  return '';
}

@NgModule({
  imports: [
    FormsModule,
    NoopAnimationsModule,
    CoreInterfaceModule,
    RouterTestingModule.withRoutes([]),
    HttpClientTestingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: mockToken
        }
      })
  ],
  providers: [
    InMemDataService,
    // TO MOCK{ provide: APP_CONFIG, useValue: FKConfig },
    { provide: AuthenticationProvider, useClass: AuthProviderMock },
    { provide: APP_CONFIG, useValue: MockConfig },
    // TO MOCK
    { provide: PRODUCTS_PROVIDER, useClass: ProductService },
    { provide: CategoryHandler, useClass: CategoryHandlerService },
     { provide: CategoryProvider, useClass: CategoryService },
     { provide: StorageProvider, useClass: LocalStorageService },
     MessageService
  ],
  exports: [
    FormsModule,
    CoreInterfaceModule,
    NoopAnimationsModule,
    RouterTestingModule,
    HttpClientTestingModule
  ],
})
export class MocksModule { }
