import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';

// Services
import { AuthenticationProvider } from '../../../global/contracts/services/authentication.provider';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardServiceService implements CanActivate, CanLoad {

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  constructor(private auth: AuthenticationProvider, private router: Router) { }

}
