import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FeatureBannerComponent } from './feature-banner.component';
import { NguCarouselModule } from '@ngu/carousel';
import { BrowserHandlerService } from '../../../../global/fk-browser/services/browser-handler.service';

// Config dependencies
import { BROWSER_CONFIG, FKBrowserConfig } from '../../../../global/fk-browser/browser.config';
import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { MocksModule } from '../../../../mocks/mocks.module';
import { FeaturedItemService } from '../../services/featured-item.service';
import { PageMocksModule } from '../../../../mocks/pageMocks.module';

describe('FeatureBannerComponent', () => {
  let component: FeatureBannerComponent;
  let fixture: ComponentFixture<FeatureBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NguCarouselModule,
      PageMocksModule ],
      declarations: [ FeatureBannerComponent ],
      providers: [FeaturedItemService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
