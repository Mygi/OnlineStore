import { Component, OnInit } from '@angular/core';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { Router } from '@angular/router';
import { BrowserHandlerService } from '../../../../global/fk-browser/services/browser-handler.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthenticationProvider, private router: Router, private _browser: BrowserHandlerService) { }

  ngOnInit() {
  }
  /**
   * Logout component
   *
   * @memberof LogoutComponent
   */
  logout() {
    this.auth.logout();
    this._browser.setSessionEnd();
    // Should be in config!!!
    this.router.navigate(['/']);
  }
}
