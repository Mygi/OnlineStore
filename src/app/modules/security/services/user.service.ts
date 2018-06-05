import { Injectable, Inject } from '@angular/core';
import { RestfulService, ConcreteRestfulService } from '../../../global/contracts/services/restful-service.abstract';
import { AuthUser, AuthUserService } from '../models/auth-user.model';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../global/contracts/config/app-config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { APP_CONFIG } from '../../../app.config';
import { UserProfile, UserProfileService } from '../models/user-profile.model';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class UserService extends ConcreteRestfulService<AuthUser> {

  private _restfulCountriesUrl = '/assets/data/countries.json';
  private _userDetailsUrl = '';
  private _passwordResetUrl = '';
  private _passwordResetConfirmUrl = '';

  constructor(http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    super(config, http);
    this._restfulCountriesUrl = config.httpServiceUrls.countries;
    this._userDetailsUrl = config.baseUrl + config.httpServiceUrls.userDetails;
    this._passwordResetUrl = config.baseUrl + config.httpServiceUrls.passwordReset;
    this._passwordResetConfirmUrl = config.baseUrl + config.httpServiceUrls.passwordResetConfirm;
  }
  public setServiceUrl(config: AppConfig): string {
    return config.baseUrl + config.httpServiceUrls.authUser + config.defaultDataSuffix;
  }
  public getCountries(): Observable<any> {
    // console.log('countries: ' + this._restfulCountriesUrl);
    return this.http.get(this._restfulCountriesUrl);
  }
  public getUserDetails(userId: number): Observable<UserProfile> {
    return this.http.get<{data: any}>(this._userDetailsUrl + '/' + userId + '/details').pipe(map(
      response => {
        // console.log(response.data);
        return response.data;
      }));
  }
  public saveUserDetails(profile: UserProfile, userId: number) {
    let item = new HttpParams();
    Object.keys(profile).forEach( key => {
      if (profile[key] !== null) {
        // console.log(profile[key]);
        if (key === 'birthDate') {
          const date = new Date(profile[key]);
          const value = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
          item = item.append(key, value);
        } else {
          item = item.append(key, profile[key]);
        }
      }
    });
    return this.http.put<UserProfileService>(this._userDetailsUrl + '/' + userId + '/details', item).pipe(map(
      response => {
        // console.log(response.data);
        return response;
      }));
  }
  // public updateEmailAddress(email: string) {

  // }
  public updatePassword(email: string, oldPassword: string, newPassword: string, passwordConfirm: string, userId: number):
         Observable<AuthUser> {
    let item = new HttpParams();
    item = item.append('emailAddress', email);
    item = item.append('oldPassword', oldPassword);
    item = item.append('newPassword', newPassword);
    item = item.append('newPassword_confirmation', passwordConfirm);
    return this.http.post<AuthUserService>(this._userDetailsUrl + '/' + userId + '/password', item).pipe(map(
      response => response.data
    ));
  }
  public sendVerificationEmail(email: string): Observable<any> {
    let item = new HttpParams();
    item = item.append('email', email);
    return this.http.post(this._passwordResetUrl, item);
  }
  public updateEmail(email: string, password: string, newEmail: string, newEmailConfirm: string, userId: number): Observable<any> {
    let item = new HttpParams();
    item = item.append('email', email);
    item = item.append('password', password);
    item = item.append('newEmailAddress', newEmail);
    item = item.append('newEmailAddress_confirmation', newEmailConfirm);
    return this.http.post<AuthUserService>(this._userDetailsUrl + '/' + userId + '/email', item).pipe(map(
      response => response.data
    ));
  }
  public confirmPasswordUpdate(email: string, newPassword: string, passwordConfirm: string, key: string): Observable<any> {
    // this._passwordResetConfirmUrl
    let item = new HttpParams();
    item = item.append('email', email);
    item = item.append('password', newPassword);
    item = item.append('password_confirmation', passwordConfirm);
    item = item.append('token', key);

    return this.http.post(this._passwordResetConfirmUrl, item);
  }
  public sendVerificationNewEmail(email: string, token: string, id: number ): Observable<any> {
    let item = new HttpParams();
    item = item.append('newEmailAddress', email);
    item = item.append('verificationToken', token);

    return this.http.post<AuthUserService>(this._userDetailsUrl + '/' + id + '/email/verify', item).pipe(map(
      response => response.data
    ));
  }
}
