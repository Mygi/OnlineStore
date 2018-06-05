import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { AuthUser } from '../../models/auth-user.model';
import { Observable } from 'rxjs/Observable';
import { AuthProviderMock } from '../../../../mocks/services/auth-provider.mock';
import { DialogModule } from 'primeng/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../../../core/fk-forms/services/message.service';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, ForgotPasswordComponent ],
      imports: [MocksModule],
      providers: [{ provide: AuthenticationProvider, useClass: AuthProviderMock}, UserService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // component.login();

  });
});
