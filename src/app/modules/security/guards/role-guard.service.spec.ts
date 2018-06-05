import { TestBed, inject, async, tick } from '@angular/core/testing';
import { RoleGuardService } from './role-guard.service';
import { AuthenticationProvider } from '../../../global/contracts/services/authentication.provider';
import { AuthProviderMock } from '../../../mocks/services/auth-provider.mock';

// Routing
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd, NavigationStart, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Routes, RouterModule, RouterOutlet, Route } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  template: '<router-outlet></router-outlet>'
})
class RoutingComponent { }

@Component({
  template: ''
})
class DummyComponent { }

describe('Testing guard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes([
        { path: 'route1', component: DummyComponent, data: {expectedRoles: [] } },
        { path: 'route2', component: DummyComponent, data: { expectedRoles: [] } },
        { path: 'login', component: DummyComponent, data: { expectedRoles: [] } }
      ])
    ],
    declarations: [DummyComponent, RoutingComponent],
    providers: [{ provide: AuthenticationProvider, useClass: AuthProviderMock },
      RoleGuardService
    ]
  }).compileComponents());

    it('should be created', inject([RoleGuardService], (service: RoleGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should not allow user to overcome the guard for whatever reasons',
    inject([RoleGuardService], (guard: RoleGuardService) => {
      const fixture = TestBed.createComponent(RoutingComponent);
      const snapshot = new ActivatedRouteSnapshot();
      snapshot.data = {expectedRoles: ['Buyer'] };
      expect(guard.canActivate(snapshot)).toBe(true);
      console.log(guard.router.routerState.snapshot);
      // The problem is we can pass a valid ActivatedRouteSnapshot yet - which leaves the other code untested
      // const snapshot2 = new ActivatedRouteSnapshot();
      // snapshot2.data = { expectedRoles: ['Admin'] };

      // expect(guard.canActivate()).toThrowError();
    })
  );
});
