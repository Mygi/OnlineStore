/**
 * JWT AuthService
 * Copyritght: the Finders Keepers
 * Created: 20/3/2018
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Rxjs
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';
// Central
import { AppConfig } from '../../../global/contracts/config/app-config';
import { APP_CONFIG } from '../../../app.config';

// JWT
import { JwtHelperService } from '@auth0/angular-jwt';

// Models
import { AuthUser, Auth, AuthUserService } from '../models/auth-user.model';

// Storage
import { SecuredStorageProvider } from './secured-storage.provider';

// Base Class
import { AuthenticationProvider  } from '../../../global/contracts/services/authentication.provider';
import { UserWithProfile, UserProfileContract } from '../../../global/contracts/modules/user.contract';
import { AuthRole } from '../models/auth-role.model';
import { ShopService } from '../../shop/services/shop.service';
import { UserProfile, UserProfileService } from '../models/user-profile.model';
import { Shop } from '../../shop/models/shop.model';

/**
 * An Authentication service that relies on a JWT to
 * handle security
 * @export
 * @class JWTAuthService
 * @extends {AuthenticationProvider}
 */
@Injectable()
export class JWTAuthService extends AuthenticationProvider {

  /**
   * restful URLS for authentication provides
   * @private
   * @type {string}
   * @memberof JWTAuthService
   */
  private serviceUserUrl: string;

  /**
   * restful URLS for authentication provides
   * @private
   * @type {string}
   * @memberof JWTAuthService
   */
  private serviceAuthUrl: string;

  /**
   * restful URLS for authentication provides
   * @private
   * @type {string}
   * @memberof JWTAuthService
   */
  private _serviceProfileUrl: string;
  /**
   * Header settings. May not be needed.
   * @private
   * @type {{ headers: HttpHeaders }}
   * @memberof JWTAuthService
   */
  private httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

  private _userProfile: BehaviorSubject<UserProfileContract>;

  private _tokenServiceUrl: string;
  /**
   * Creates an instance of JWTAuthService.
   * @param {JwtHelperService} jwtHelper
   * @param {HttpClient} http
   * @param {AppConfig} config
   * @param {SecuredStorageProvider} storageProvider
   * @memberof JWTAuthService
   */
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig,
    private storageProvider: SecuredStorageProvider) {
    super();
    this.setUrl( config );
    this.storageProvider.setDomain(config.cookieUrl);
    if ( this.getAuthProfile() !== undefined ) {
      this._userProfile = new BehaviorSubject<UserProfile>(this.getAuthProfile() as UserProfile);
    } else {
      this._userProfile = new BehaviorSubject<UserProfile>(new UserProfile(0));
    }
  }

  /**
   * Sets up the URLS for getting data
   * @private
   * @param {AppConfig} config
   * @memberof JWTAuthService
   */
  private setUrl(config: AppConfig) {
    this.serviceUserUrl = config.baseUrl + config.httpServiceUrls.authUser + config.defaultDataSuffix;
    this.serviceAuthUrl = config.baseUrl + config.httpServiceUrls.auth + config.defaultDataSuffix;
    this._serviceProfileUrl = config.baseUrl + config.httpServiceUrls.shopForUser;
    this._tokenServiceUrl = config.baseUrl + 'token';
  }

  /**
   * Checks the existence and validity
   * of a JWT
   * @returns {boolean}
   * @memberof JWTAuthService
   */
  public isAuthenticated(): boolean {
    const token = this.storageProvider.getAuthToken();
    // Check whether the token is expired and return
    try {
      const data = this.jwtHelper.decodeToken(token);
      // Any other work on token
      return !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      throw(e);
    }
  }
  public refreshSession(): void {
    //
    this.http.get<{token: string}>(this._tokenServiceUrl).subscribe(
      response => {
        if (response.token !== undefined) {
          this.storageProvider.setAuthToken(response.token);
          // console.log('refreshed');
          // console.log(response.token);
        }
      });
  }
  /**
   * login function
   *
   * @param {string} userName
   * @param {string} password
   * @returns {Observable<AuthUser>}
   * @memberof AuthService
   */
  public login(userName: string, password: string): Observable<AuthUser> {
    this.logout();
    const authRequest: Auth = new Auth(userName, password);
    // return this.http.get<Auth>( this.serviceAuthUrl);

    const authSub =  this.http.post<Auth>( this.serviceAuthUrl, authRequest, this.httpOptions  );
    // switchMap to ensure subscriber is passed on but not yet modular
    return authSub.pipe(switchMap( auth => {
      const id = auth.userID;
      const token = auth.token;
      this.storageProvider.setAuthToken(token);
      return this.http.get<UserProfileService>(this._serviceProfileUrl + '/' + id).pipe(switchMap(
        result => {
          const profile = result.data;
          const userProfile = new  UserProfile(id);
          userProfile.emailAaddress = profile.emailAaddress;
          const shop = new Shop();
          shop.bridgeFrom(id, profile.shop.data);
          userProfile.shop = shop;
          return this.http.get<AuthUserService>(this.serviceUserUrl + '/' + id ).pipe(map( user => {
          const authUser: AuthUser = new AuthUser();
          authUser.copyTo(user.data);
          authUser.userProfile = userProfile;
          if (authUser.userID) {
            this.storageProvider.setUser(authUser);
            if (userProfile !== undefined ) {
              this.updateAuthProfile(userProfile);
            }
            // should check token
          }
          return authUser;
      }));
    }));
    }));
  }
  authenticate(userName: string, password: string): Observable<Auth> {
    const authRequest: Auth = new Auth(userName, password);
    return this.http.post<Auth>(this.serviceAuthUrl, authRequest, this.httpOptions);
  }
  updateAuthProfile(profile: UserProfileContract) {
    this.storageProvider.setUserProfile(profile as UserProfile);
    if (this._userProfile !== undefined) {
      this._userProfile.next(profile);
    } else {
      this._userProfile = new BehaviorSubject<UserProfile>(profile as UserProfile);
    }
  }
  public logout(): boolean {
    this.storageProvider.deleteStorage();
    // Logout service needs to be called - but requires spec
    return true;
  }
  // get User from session
  public getAuthUser(): UserWithProfile {
    if ( this.isAuthenticated() ) {
      const copiedUser = new AuthUser();
      copiedUser.copyTo(this.storageProvider.getUser());
      return copiedUser;
    } else {
      return null;
    }
  }

  // get the JWT token
  public getAuthToken(): string {
    return this.storageProvider.getAuthToken();
  }

  // Send an array of roles and check if user is in one of them
  public checkRoles(expectedRoles: string[]): boolean {
    let allowUser = false;
    expectedRoles.forEach(role => {
      // this.storageProvider.getRoles()
      if ( this.hasRole(role) ) {
        allowUser = true;
      }
    });
    return allowUser;
  }
  public hasRole(role: string): boolean {
    return this.storageProvider.getRoles().find(x => x.slug.toLowerCase() === role.toLowerCase()) !== undefined;
  }

  getAuthProfile(): UserProfileContract {
    const profile = new UserProfile();
    if (this.storageProvider.getUserProfile() !== null) {
      profile.copyFrom(this.storageProvider.getUserProfile());
    }
    return profile;
  }
  public subscribeAuthProfile(): BehaviorSubject<UserProfileContract> {
    return this._userProfile;
  }
}

