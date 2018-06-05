import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserEventsComponent } from './browser-events.component';
import { BrowserHandlerService } from '../../services/browser-handler.service';
import { BROWSER_CONFIG, FKBrowserConfig } from '../../browser.config';
import { BlockUIModule } from 'primeng/blockui';
import { UserIdleModule, UserIdleService } from 'angular-user-idle';
import { AuthenticationProvider } from '../../../contracts/services/authentication.provider';
import { AuthProviderMock } from '../../../../mocks/services/auth-provider.mock';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BrowserEventsComponent', () => {
  let component: BrowserEventsComponent;
  let fixture: ComponentFixture<BrowserEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), BlockUIModule,
        NoopAnimationsModule,
        UserIdleModule.forRoot({ idle: 6000, timeout: 6000, ping: 120 }) ],
      declarations: [ BrowserEventsComponent ],
      providers: [ BrowserHandlerService, UserIdleService,
        { provide: AuthenticationProvider, useClass: AuthProviderMock },
        { provide: BROWSER_CONFIG, useValue: FKBrowserConfig }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
