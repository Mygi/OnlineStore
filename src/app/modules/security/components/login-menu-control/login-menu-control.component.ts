import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login-menu-control',
  templateUrl: './login-menu-control.component.html',
  styleUrls: ['./login-menu-control.component.scss']
})
export class LoginMenuControlComponent implements OnInit {
  @Input() mode: string;
  public isAuthenticated: boolean;
  constructor(private authService: AuthenticationProvider, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.isAuthenticated = this.authService.isAuthenticated();
      }
    });
  }
}
