import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationProvider } from '../global/contracts/services/authentication.provider';
import { ProductsProvider } from '../global/contracts/modules/products.contract';
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
import { CategoryHandlerService } from '../core/categories/services/category-handler.service';

// Set up a single import module replete with necessary mocking of items in the global scope

@NgModule({
  imports: [
    FormsModule,
    NoopAnimationsModule,
    // CoreInterfaceModule,
    RouterTestingModule.withRoutes([]),
    HttpClientTestingModule,
  ],
  providers: [
    // InMemDataService,
    // TO MOCK{ provide: APP_CONFIG, useValue: FKConfig },
    // { provide: AuthenticationProvider, useClass: AuthProviderMock },
    { provide: APP_CONFIG, useValue: MockConfig },
    // TO MOCK
    // { provide: ProductsProvider, useClass: ProductMockService },
    { provide: CategoryHandler, useClass: CategoryHandlerService }
    // { provide: CategoryProvider, useClass: CategoryMockService }
    // { provide: StorageProvider, useClass: LocalStorageService },
  ],
  exports: [
    FormsModule,
    HttpClientTestingModule,
    RouterTestingModule,
    NoopAnimationsModule
  ],
})
export class MockCoreModule { }
