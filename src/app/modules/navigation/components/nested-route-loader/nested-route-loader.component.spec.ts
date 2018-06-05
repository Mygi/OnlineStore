import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// services
import { BrowserHandlerService } from '../../../../global/fk-browser/services/browser-handler.service';

// router tests
import { RouterTestingModule } from '@angular/router/testing';

// config
import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { BROWSER_CONFIG, FKBrowserConfig } from '../../../../global/fk-browser/browser.config';

// component
import { NestedRouteLoaderComponent } from './nested-route-loader.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component';
import { SecurityModule } from '../../../security/security.module';

describe('NestedRouteLoaderComponent', () => {
  let component: NestedRouteLoaderComponent;
  let fixture: ComponentFixture<NestedRouteLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule, SecurityModule],
      declarations: [ NestedRouteLoaderComponent, DashboardMenuComponent ],
      providers: [BrowserHandlerService,
        { provide: APP_CONFIG, useValue: FKConfig },
        { provide: BROWSER_CONFIG, useValue: FKBrowserConfig }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedRouteLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

