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
import { StorageProvider } from '../global/contracts/services/storage.provider';
import { ProductService } from '../modules/products/services/product.service';
import { CategoryHandlerService } from '../core/categories/services/category-handler.service';
import { CategoryService } from '../core/categories/services/category.service';
import { LocalStorageService } from '../core/storage/services/local-storage.service';

// Set up a single import module replete with necessary mocking of items in the global scope
export function mockToken2() {
  return '';
}
@NgModule({
  imports: [
    FormsModule,
    NoopAnimationsModule,
    FKBrowserModule,
    RouterTestingModule.withRoutes([]),
    HttpClientTestingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: mockToken2
      }
    })
  ],
  providers: [
    { provide: AuthenticationProvider, useClass: AuthProviderMock },
    { provide: APP_CONFIG, useValue: MockConfig },
    // TO MOCK
    { provide: PRODUCTS_PROVIDER, useClass: ProductService },
    { provide: CategoryHandler, useClass: CategoryHandlerService },
    { provide: CategoryProvider, useClass: CategoryService },
    { provide: StorageProvider, useClass: LocalStorageService },
  ],
  exports: [
    FormsModule,
    NoopAnimationsModule,
    RouterTestingModule,
    HttpClientTestingModule,
    FKBrowserModule
  ],
})
export class PageMocksModule { }
