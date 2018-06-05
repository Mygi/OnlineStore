import { Component, OnInit } from '@angular/core';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthUser } from '../../models/auth-user.model';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../../../core/fk-forms/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model: { password: string, username: string }  = {password: '', username: ''};
  public username = '';
  public authenticating = false;
  public message = 'Signing you in. One moment please.';
  public responseAvailable = false;
  public returnUrl: string;
  private defaultRoute = '/sellers/home';
  public user: AuthUser = new AuthUser(0);
  display = false;
  icon = 'fa-circle-notch fa-spin';
  loadingIcon = 'fa-circle-notch fa-spin';
  warnIcon = 'fa-exclamation-triangle';
  header = 'Update Password';

  emailAddress: string;
  token: string;
  key: string;

  showPasswordReset = false;
  showForgotPassword = true;
  showConfirmEmail = false;
  constructor(private authService: AuthenticationProvider, private route: ActivatedRoute,
    private router: Router, private userService: UserService, private _messages: MessageService) { }

  ngOnInit() {
    this._messages.clear();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.defaultRoute;
    if (this.returnUrl !== this.defaultRoute ) {
      this.message = 'Sorry you are not signed in. Please log in to continue to that page';
      this.responseAvailable = true;
      this.icon = this.warnIcon;
      this.authenticating = true;
    }
    this.route.paramMap.forEach((params: ParamMap) => {
      if (params.has('key')) {
        this.display = true;
        this.key = params.get('key');
        this.showPasswordReset = true;
        this.showForgotPassword = false;
        this.showConfirmEmail = false;
      }
      if (params.has('token')) {
        this.display = true;
        this.token = params.get('token');
        if (this.authService.isAuthenticated()) {
          this.user = this.authService.getAuthUser() as AuthUser;
          if ( this.user === null)  {
            this.user = new AuthUser();
          }
        } else {
          this.user = new AuthUser();
        }
      }
      if (params.has('email')) {
        this.emailAddress = params.get('email');
        this.showConfirmEmail = true;
        this.showPasswordReset = false;
        this.showForgotPassword = false;
      }
    });
  }
  login() {
    this.icon = this.loadingIcon;
    this.responseAvailable = true;
    this.authenticating = true;
    this.message = 'Signing you in. One moment please.';
    // logout first in case someone is in session
    this.authService.logout();

    // login and reroute on success
    this.authService.login(this.model.username, this.model.password ).subscribe(
      data => {
        // console.log(data);
        if ( data.getId() ) {
          this.authenticating = false;
          this.responseAvailable = false;
          this.router.navigate([this.returnUrl]);
        } else {
          this.message = 'Sorry. We could not log you in with that information. Please try again.';
          this.icon = this.warnIcon;
          this.authenticating = false;
        }
      },
      error => {
        console.log(error);
        this.message = 'Sorry. We could not log you in with that information. Please try again.';
        this.icon = this.warnIcon;
        this.authenticating = false;
      } );
  }
  acknowledgeMessage() {
    this.responseAvailable = false;
  }
}
