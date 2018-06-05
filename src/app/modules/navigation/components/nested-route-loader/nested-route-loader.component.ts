import { Component, OnInit } from '@angular/core';

import {BrowserHandlerService } from '../../../../global/fk-browser/services/browser-handler.service';
import { Browser, BrowserState, BrowserType } from '../../../../global/fk-browser/models/browser.model';
import { Router, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';

// shared
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { UrlSegments } from '../../common/dashboard-roles.enum';
@Component({
  selector: 'app-nested-route-loader',
  templateUrl: './nested-route-loader.component.html',
  styleUrls: ['./nested-route-loader.component.scss']
})
export class NestedRouteLoaderComponent implements OnInit {
  public currentPage = '';
  isLoaded = false;
  isLoading = true;

  constructor(private authService: AuthenticationProvider, private router: Router, private domService: BrowserHandlerService, ) { }

  ngOnInit() {
    this.domService.getAppVariables().subscribe(appVariables => {
      this.isLoading = appVariables.browser.browserState === BrowserState.loading;
      this.isLoaded = appVariables.browser.browserState === BrowserState.loaded;
    });
  }
  // TODO : Another helper function that should eventually move
  parseUrl(url: string) {
    if ( url === '' ) {
      return '';
    }

    const tree: UrlTree = this.router.parseUrl(url);
    if ( tree.root.hasChildren ) {
      const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
      if (g ) {
        const s: UrlSegment[] = g.segments;
        return s;
      }
    }
    return '';
  }
  // Arguably you could pass a parameter to the route - as in `/dashboard/:roleName/`
  // But for all we know - there may end up being some unique logic to each role Page
  // with separation required again. Also it takes away some of our ability to guard child routes.
  // So instead we search for the route in the url as a convention.
  // Needs to be some logic for when this breaks!
  getCurrentPage() {
    // @TODO put simply this needs some thorough testing and probably a service of its own!!
    const segments = this.parseUrl(this.router.url);
    if (segments === '') {
      return '';
    }
    if (segments[UrlSegments.role] !== undefined) {
      return segments[UrlSegments.role];
    }
    return '';
  }

  hasRole(roles: string[]) {
    // A more generic form would parse the router config and check data items individually - requiring recursive tree search
    return this.authService.checkRoles( roles );
  }
}
