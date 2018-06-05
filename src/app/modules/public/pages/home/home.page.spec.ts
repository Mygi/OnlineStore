import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Mocking
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Under test
import { HomePageComponent } from './home.page';


import { FeatureBannerComponent} from '../../components/feature-banner/feature-banner.component';
import { NguCarouselModule } from '@ngu/carousel';

// Config
import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { BROWSER_CONFIG, FKBrowserConfig } from '../../../../global/fk-browser/browser.config';

// Config
// JWT
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { ProductsModule } from '../../../../modules/products/products.module';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';
import { PageMocksModule } from '../../../../mocks/pageMocks.module';
import { FeaturedItemService } from '../../services/featured-item.service';

xdescribe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PageMocksModule, NguCarouselModule],
      declarations: [HomePageComponent,
                     NewsletterComponent, FeatureBannerComponent ],
      providers: [
        AuthenticationProvider, JwtHelperService, FeaturedItemService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
