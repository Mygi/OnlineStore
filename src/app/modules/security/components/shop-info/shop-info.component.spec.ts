import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInfoComponent } from './shop-info.component';
// router tests
import { RouterTestingModule } from '@angular/router/testing';
//
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { AuthProviderMock } from '../../../../mocks/services/auth-provider.mock';

import { Observable } from 'rxjs/Observable';
import { MocksModule } from '../../../../mocks/mocks.module';
import { LogoutComponent } from '../logout/logout.component';

xdescribe('ShopInfoComponent', () => {
  let component: ShopInfoComponent;
  let fixture: ComponentFixture<ShopInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule
        ],
      declarations: [ ShopInfoComponent, LogoutComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
