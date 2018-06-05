// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// 3rd party
import { CookieService } from 'ngx-cookie-service';

// Global Modules
import { FKBrowserModule } from './global/fk-browser/fk-browser.module';

// Contracts
import { AuthenticationProvider } from './global/contracts/services/authentication.provider';
import { CategoryHandler, CategoryProvider } from './global/contracts/modules/category.contract';
import { StorageProvider } from './global/contracts/services/storage.provider';
import { APP_CONFIG, FKConfig } from './app.config';
import { ProductsProvider, PRODUCTS_PROVIDER } from './global/contracts/modules/products.contract';

// Site Modules
// import { BackEndModule } from './sites/back-end/back-end.module';

// Contract Providers Modules
import { CategoryHandlerService } from './core/categories/services/category-handler.service';
import { CategoryService } from './core/categories/services/category.service';
import { ProductService } from './modules/products/services/product.service';
import { LocalStorageService } from './core/storage/services/local-storage.service';

// SECURITY
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JWTAuthService } from './modules/security/services/jwt-auth.service';
import { SecuredStorageProvider } from './modules/security/services/secured-storage.provider';
import { secureStorageServiceFactory } from './modules/security/services/secure-storage.factory';


// Mocking
import { AdminModule } from './modules/admin/admin.module';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemDataService } from './global/mocks/storage/in-mem-data.service';

// Main Component
import { AppComponent } from './app.component';
// import { SellersModule } from './sites/sellers/sellers.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PublicRoutingModule } from './public.routes';
import { SecurityModule } from './modules/security/security.module';
import { SHOP_PROVIDER } from './global/contracts/modules/shop.contract';
import { ShopService } from './modules/shop/services/shop.service';


// JWT factory function
export function jwtOptionsFactory(secureStorage: SecuredStorageProvider) {
  return {
    tokenGetter: () => {
      return secureStorage.getAuthToken();
    },
    // Fix to use environments
    whitelistedDomains: ['dev-api.thefinderskeepersmarketplace.com', 'http://localhost:4444',
    'http://fk-om-frontend-dev.s3-website-ap-southeast-2.amazonaws.com',
    'http://fk-om-frontend-release.s3-website-ap-southeast-2.amazonaws.com']
  };
}
/**
 * Fulfillment of contracts should be inserted here
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FKBrowserModule,
    PublicRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [SecuredStorageProvider]
      },
      config: {
        whitelistedDomains: ['dev-api.thefinderskeepersmarketplace.com', 'http://localhost:4444',
        'http://fk-om-frontend-release.s3-website-ap-southeast-2.amazonaws.com']
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SecurityModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: FKConfig },
    { provide: AuthenticationProvider, useClass: JWTAuthService },
    { provide: PRODUCTS_PROVIDER, useClass: ProductService},
    { provide: SHOP_PROVIDER, useClass: ShopService },
    { provide: CategoryHandler, useClass: CategoryHandlerService},
    { provide: CategoryProvider, useClass: CategoryService},
    { provide: StorageProvider, useClass: LocalStorageService},
    CookieService,
    { provide: SecuredStorageProvider, useFactory: secureStorageServiceFactory, deps: [CookieService, APP_CONFIG] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
