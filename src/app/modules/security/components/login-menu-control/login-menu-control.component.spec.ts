import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMenuControlComponent } from './login-menu-control.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { AuthProviderMock } from '../../../../mocks/services/auth-provider.mock';

describe('LoginMenuControlComponent', () => {
  let component: LoginMenuControlComponent;
  let fixture: ComponentFixture<LoginMenuControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      declarations: [ LoginMenuControlComponent],
        providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMenuControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
