import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { JWTAuthService } from './jwt-auth.service';
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { AuthUser, Auth, AuthUserService } from '../models/auth-user.model';
import { AuthRole } from '../models/auth-role.model';

// Storage
import { SecuredStorageProvider } from './secured-storage.provider';
import { secureStorageServiceFactory } from './secure-storage.factory';

// config
import { APP_CONFIG, FKConfig } from '../../../app.config';
import { CookieService } from 'ngx-cookie-service';
import { UserProfile, UserProfileService, UserProfileServiceData } from '../models/user-profile.model';
import { MockConfig } from '../../../mocks/config/mock.config';
import { Shop, ShopServiceModel } from '../../shop/models/shop.model';


describe('JWTAuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const userProfile: UserProfileService = new UserProfileService();
  const auth: Auth = new Auth('unknownUser', 'unknown Password', 1, 'token');
  const user: AuthUser = new AuthUser(1, 'test', 'test', 'test', 'test', true, { data: [] }, new UserProfile(0));
  const authService: AuthUserService = { data: user };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          },
          headerName: 'TestHeader'
        }
      })],
      providers: [JWTAuthService, JwtHelperService, CookieService,
        { provide: SecuredStorageProvider, useFactory: secureStorageServiceFactory, deps: [CookieService, APP_CONFIG] },
        { provide: APP_CONFIG, useValue: MockConfig }]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userProfile.data = new UserProfileServiceData();
    userProfile.data.emailAaddress = 'test@test.com';
    userProfile.data.userID = 1;
    userProfile.data.shop = { data: new ShopServiceModel() };
    userProfile.data.shop.data.shopID = 1;
    userProfile.data.shop.data.mainImage = '';
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', inject([JWTAuthService], (service: JWTAuthService) => {
    expect(service).toBeTruthy();
  }));

  // Test
  it('should be sending authRequest', inject([JWTAuthService], (service: JWTAuthService) => {
    service.login('unknownUser', 'unknwon Password').subscribe( authuser => {
        console.log(authuser);
      expect(authuser.userProfile.userID).toEqual(1);
      expect(authuser.userID).toEqual(1);
      expect(authuser.userID).toEqual(1);
      }
    );

    // we;ll need an environment here
    const req = httpTestingController.expectOne('http://localhost:4444/assets/testData/auth');
    expect(req.request.method).toEqual('POST');
    req.flush(auth);

    const req3 = httpTestingController.expectOne('http://localhost:4444/assets/testData/private/users/1');
    req3.flush(userProfile);

    const req2 = httpTestingController.expectOne('http://localhost:4444/assets/testData/authUser/1');
    expect(req2.request.method).toEqual('GET');
    // // NB: This is not set as JWT is intercepted before it has a chance to set
    // // console.log(req2.request.headers.has('TestHeader'));
    req2.flush(authService);
  }));

  it('expects a 401 for unknown login', inject([JWTAuthService], (service: JWTAuthService) => {
    const msg =  'Error - not found';
    service.login('unknownUser', 'unknwon Password').subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
      expect(error.status).toEqual(401, 'status');
      expect(error.error).toEqual(msg, 'message');
      }
    );

    // we;ll need an environment here
    const req = httpTestingController.expectOne('http://localhost:4444/assets/testData/auth');
    expect(req.request.method).toEqual('POST');
    req.flush(msg, { status: 401, statusText: 'Not Found' });
  }));

  it('should store token after successful request - but not authenticated', inject([JWTAuthService], (service: JWTAuthService) => {
    // tslint:disable-next-line:max-line-length
    const err: Error = new Error('The inspected token doesn\'t appear to be a JWT.Check to make sure it has three parts and see https://jwt.io for more');

    service.login('unknownUser', 'unknwon Password').subscribe(authuser => {
      expect(service.getAuthToken()).toEqual('token');
      expect( service.isAuthenticated ).toThrow();
      // should faile authentication becuase no expiry
    }
    );

    // Auth Code
    const req = httpTestingController.expectOne('http://localhost:4444/assets/testData/auth');
    expect(req.request.method).toEqual('POST');
    req.flush(auth);

    const req3 = httpTestingController.expectOne('http://localhost:4444/assets/testData/private/users/1');
    req3.flush(userProfile);

    const req2 = httpTestingController.expectOne('http://localhost:4444/assets/testData/authUser/1');
    expect(req2.request.method).toEqual('GET');
    req2.flush(authService);
  }));

  it('should store valid token after successful request -  authenticated', inject([JWTAuthService], (service: JWTAuthService) => {
    // tslint:disable-next-line:max-line-length
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWwtYXBpLnRoZWZpbmRlcnNrZWVwZXJzbWFya2V0cGxhY2UuY29tL3YxL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTUyMDkxMDI1NywiZXhwIjoxNzIwOTEzODU3LCJuYmYiOjE1MjA5MTAyNTcsImp0aSI6InRnRklzak9qSVVESjFtUm0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.qX2sxX2MSOT - mCpvXzkVDVQURrts30xyX - vQbWTNGX0';
    auth.token = token;
    // tslint:disable-next-line:max-line-length
    const err: Error = new Error('The inspected token doesn\'t appear to be a JWT.Check to make sure it has three parts and see https://jwt.io for more');

    service.login('unknownUser', 'unknwon Password').subscribe(authuser => {
      // expect(authuser).toEqual(user);
      expect(service.getAuthToken()).toEqual(token);
      expect(service.isAuthenticated()).toBeTruthy();
      // should faile authentication becuase no expiry
    }
    );

    const req = httpTestingController.expectOne('http://localhost:4444/assets/testData/auth');
    expect(req.request.method).toEqual('POST');
    req.flush(auth);

    const req3 = httpTestingController.expectOne('http://localhost:4444/assets/testData/private/users/1');
    req3.flush(userProfile);

    const req2 = httpTestingController.expectOne('http://localhost:4444/assets/testData/authUser/1');
    expect(req2.request.method).toEqual('GET');
    req2.flush(authService);
  }));

  it('should fail role checks on empty roles', inject([JWTAuthService], (service: JWTAuthService) => {
    // tslint:disable-next-line:max-line-length
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWwtYXBpLnRoZWZpbmRlcnNrZWVwZXJzbWFya2V0cGxhY2UuY29tL3YxL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTUyMDkxMDI1NywiZXhwIjoxNzIwOTEzODU3LCJuYmYiOjE1MjA5MTAyNTcsImp0aSI6InRnRklzak9qSVVESjFtUm0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.qX2sxX2MSOT - mCpvXzkVDVQURrts30xyX - vQbWTNGX0';
    auth.token = token;
    // tslint:disable-next-line:max-line-length
    const err: Error = new Error('The inspected token doesn\'t appear to be a JWT.Check to make sure it has three parts and see https://jwt.io for more');

    service.login('unknownUser', 'unknwon Password').subscribe(authuser => {
      expect(service.getAuthToken()).toEqual(token);
      expect(service.isAuthenticated()).toBeTruthy();
      expect(service.hasRole('any')).toBeFalsy();
      expect(service.checkRoles(['role1', 'role2'])).toBeFalsy();
      // should faile authentication becuase no expiry
    }
    );

    const req = httpTestingController.expectOne('http://localhost:4444/assets/testData/auth');
    expect(req.request.method).toEqual('POST');
    req.flush(auth);

    const req3 = httpTestingController.expectOne('http://localhost:4444/assets/testData/private/users/1');
    req3.flush(userProfile);

    const req2 = httpTestingController.expectOne('http://localhost:4444/assets/testData/authUser/1');
    expect(req2.request.method).toEqual('GET');
    req2.flush(authService);
  }));

  it('should pass appropriate role checks', inject([JWTAuthService], (service: JWTAuthService) => {
    // tslint:disable-next-line:max-line-length
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWwtYXBpLnRoZWZpbmRlcnNrZWVwZXJzbWFya2V0cGxhY2UuY29tL3YxL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTUyMDkxMDI1NywiZXhwIjoxNzIwOTEzODU3LCJuYmYiOjE1MjA5MTAyNTcsImp0aSI6InRnRklzak9qSVVESjFtUm0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.qX2sxX2MSOT - mCpvXzkVDVQURrts30xyX - vQbWTNGX0';
    auth.token = token;
    const role1: AuthRole = new AuthRole(1, 'role1', 'role 1', 'a role', []);
    user.roles.data.push(role1);
    // tslint:disable-next-line:max-line-length
    const err: Error = new Error('The inspected token doesn\'t appear to be a JWT.Check to make sure it has three parts and see https://jwt.io for more');

    service.login('unknownUser', 'unknwon Password').subscribe(authuser => {
      expect(service.getAuthToken()).toEqual(token);
      expect(service.isAuthenticated()).toBeTruthy();
      expect(service.hasRole('role2')).toBeFalsy();
      expect(service.hasRole('role1')).toBeTruthy();
      expect(service.checkRoles(['role1', 'role2'])).toBeTruthy();
      // should faile authentication becuase no expiry
    }
    );

    // Auth Code
    const req = httpTestingController.expectOne('http://localhost:4444/assets/testData/auth');
    expect(req.request.method).toEqual('POST');
    req.flush(auth);

    const req3 = httpTestingController.expectOne('http://localhost:4444/assets/testData/private/users/1');
    req3.flush(userProfile);

    const req2 = httpTestingController.expectOne('http://localhost:4444/assets/testData/authUser/1');
    expect(req2.request.method).toEqual('GET');
    req2.flush(authService);
  }));

  it('should logout by deleting storage and sending request', inject([JWTAuthService], (service: JWTAuthService) => {
    // tslint:disable-next-line:max-line-length
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWwtYXBpLnRoZWZpbmRlcnNrZWVwZXJzbWFya2V0cGxhY2UuY29tL3YxL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTUyMDkxMDI1NywiZXhwIjoxNzIwOTEzODU3LCJuYmYiOjE1MjA5MTAyNTcsImp0aSI6InRnRklzak9qSVVESjFtUm0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.qX2sxX2MSOT - mCpvXzkVDVQURrts30xyX - vQbWTNGX0';
    auth.token = token;
    const role1: AuthRole = new AuthRole(1, 'role1', 'role 1', 'a role', []);
    user.roles.data.push(role1);
    // tslint:disable-next-line:max-line-length
    const err: Error = new Error('The inspected token doesn\'t appear to be a JWT.Check to make sure it has three parts and see https://jwt.io for more');

    service.login('unknownUser', 'unknwon Password').subscribe(authuser => {
      expect(service.isAuthenticated()).toBeTruthy();
      service.logout();
      expect(service.isAuthenticated()).toBeFalsy();
      expect(service.getAuthUser()).toBeNull();
      // should faile authentication becuase no expiry
    }
    );

    // Auth Code
    const req = httpTestingController.expectOne('http://localhost:4444/assets/testData/auth');
    expect(req.request.method).toEqual('POST');
    req.flush(auth);

    const req3 = httpTestingController.expectOne('http://localhost:4444/assets/testData/private/users/1');
    req3.flush(userProfile);

    const req2 = httpTestingController.expectOne('http://localhost:4444/assets/testData/authUser/1');
    expect(req2.request.method).toEqual('GET');
    req2.flush(authService);
  }));
});
