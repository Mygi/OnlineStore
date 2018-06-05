import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthenticationProvider } from '../../../global/contracts/services/authentication.provider';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthenticationProvider, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    // console.log(route);
    if (this.auth.checkRoles(route.data.expectedRoles) && this.auth.isAuthenticated()) {
      return true;
    }
    if ( 'pathFromRoot' in route ) {
      this.router.navigate(['login'], { queryParams: { returnUrl: this.generatePath(route.pathFromRoot) } });
    } else {
      this.router.navigate(['login']);
    }
    return false;
  }
  // This may become a common problem
  private generatePath(allPaths: ActivatedRouteSnapshot[] ): string {
    if (allPaths.length === 0) {
      return '';
    }
    if (allPaths[0]['_routerState'] !== undefined ) {
      return allPaths[0]['_routerState'].url;
    }
    return '';
  }

}
