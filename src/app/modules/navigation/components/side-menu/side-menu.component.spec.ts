import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Mocking
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Under test
import { SideMenuComponent } from './side-menu.component';

// Services
import { BrowserHandlerService } from '../../../../global/fk-browser/services/browser-handler.service';
import { AuthProviderMock } from '../../../../mocks/services/auth-provider.mock';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';

// Config
import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { BROWSER_CONFIG, FKBrowserConfig } from '../../../../global/fk-browser/browser.config';

// JWT
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { MocksModule } from '../../../../mocks/mocks.module';
import { Browser } from 'protractor';
import { ShoppingCartModule } from '../../../shopping-cart/shopping-cart.module';
import { SecurityModule } from '../../../security/security.module';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule,
        ShoppingCartModule,
        SecurityModule
      ],
      declarations: [ SideMenuComponent ],
      providers: [BrowserHandlerService,
        { provide: BROWSER_CONFIG, useValue: FKBrowserConfig }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
