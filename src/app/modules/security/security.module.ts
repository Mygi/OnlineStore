import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// 3rd Party
import { CookieService } from 'ngx-cookie-service';
import { JwtModule, JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';

// FK Modules
import { CoreInterfaceModule } from '../../core/core-interface/core-interface.module';

// Components
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginMenuControlComponent } from './components/login-menu-control/login-menu-control.component';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
// services
import { SecuredStorageProvider } from './services/secured-storage.provider';
import { secureStorageServiceFactory } from './services/secure-storage.factory';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { UserService } from './services/user.service';
import { UpdateEmailFormComponent } from './components/update-email-form/update-email-form.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
// import { HTTP_INTERCEPTORS } from '@angular/core/'
// import { JwtInterceptor } from ‘@auth0/angular-jwt’;
// Font awesome
// security
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreInterfaceModule
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    LoginMenuControlComponent,
    ShopInfoComponent,
    ForgotPasswordComponent,
    AccountFormComponent,
    UpdateEmailFormComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent
    ],
  providers: [UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    LoginMenuControlComponent,
    ShopInfoComponent,
     AccountFormComponent
  ]
})
export class SecurityModule { }
