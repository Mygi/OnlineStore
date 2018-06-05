import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { AuthProviderMock } from '../../../../mocks/services/auth-provider.mock';

xdescribe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      declarations: [ LogoutComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
