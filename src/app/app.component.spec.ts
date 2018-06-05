// Testing
import { TestBed, async } from '@angular/core/testing';

// Mocking
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// 3rd PArty
import { CookieService } from 'ngx-cookie-service';
// Under Test
import { AppComponent } from './app.component';

// Component dependencies
import { NewsletterComponent } from './modules/public/components/newsletter/newsletter.component';
import { BrowserEventsComponent } from './global/fk-browser/components/browser-events/browser-events.component';

// Provider dependencies
import { BrowserHandlerService } from './global/fk-browser/services/browser-handler.service';

// Contract

import { AuthenticationProvider } from './global/contracts/services/authentication.provider';
// JWT
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

// Config dependencies
import { BROWSER_CONFIG, FKBrowserConfig } from './global/fk-browser/browser.config';
import { APP_CONFIG, FKConfig } from './app.config';

// SECURITY
import { JWTAuthService } from './modules/security/services/jwt-auth.service';

import { SecuredStorageProvider } from './modules/security/services/secured-storage.provider';
import { secureStorageServiceFactory } from './modules/security/services/secure-storage.factory';
import { MocksModule } from './mocks/mocks.module';
import { PageMocksModule } from './mocks/pageMocks.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PageMocksModule
        ],
      declarations: [
        AppComponent
      ],
      providers: []
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Finders Keepers Online Marketplace');
  }));
});
