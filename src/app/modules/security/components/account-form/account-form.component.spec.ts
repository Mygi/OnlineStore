import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormComponent } from './account-form.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { DialogModule } from 'primeng/dialog';
import { AuthUser } from '../../models/auth-user.model';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { UpdateEmailFormComponent } from '../update-email-form/update-email-form.component';
import { UserService } from '../../services/user.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

fdescribe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule, DialogModule],
      declarations: [ AccountFormComponent, ResetPasswordComponent, UpdateEmailFormComponent ],
      providers: [UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
    component.user = new AuthUser(1, '', '', '', '', true, {data: []});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
