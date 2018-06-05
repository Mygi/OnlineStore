// Core
import { Injectable } from '@angular/core';

// Third Party
import { CookieService } from 'ngx-cookie-service';

// Models
import {Auth, AuthUser} from '../models/auth-user.model';
import { AuthRole } from '../models/auth-role.model';
import { UserProfile } from '../models/user-profile.model';

// Local Imports
import { SecuredStorageProvider, storageKeys} from './secured-storage.provider';
import { StorageProvider } from '../../../global/contracts/services/storage.provider';
/**
 * The secure storage provider has a storage provider
 * injected. Arguably the abstraction is not needed.
 * @export
 * @class SecureStorageService
 * @extends {SecuredStorageProvider}
 */
@Injectable()
export class SecureStorageService extends SecuredStorageProvider {

  /**
   * Checks the build in navigato function for cookies.
   * @private
   * @memberof ClientStorageService
   */
  private useCookie = true;
  constructor(private storage: StorageProvider) {
    super();
   }

  /**
   * Set the JWT in a secured cookie, default to local storage
   * @param token a JWT
   * @memberof ClientStorageService
   */
  setAuthToken(token: string) {
    this.storage.deleteKey(storageKeys[storageKeys.authToken]);
    this.storage.setKeyValue(storageKeys[storageKeys.authToken], token);
  }

  /**
   * Get The Authentication token
   * @returns {string}
   * @memberof ClientStorageService
   */
  getAuthToken(): string {
    return this.storage.getKeyValue(storageKeys[storageKeys.authToken]);
  }

  deleteStorage() {
    this.storage.clearData();
  }
  /**
   * Sets the AuthUser model into client storage
   * @param {AuthUser} user
   * @memberof ClientStorageService
   */
  setUser( user: AuthUser) {
    this.storage.setObjectValue(storageKeys[storageKeys.authUser], user);
  }

  /**
   * Gets The AuthUser Model from client storage
   * TODO We need to better handle serialisation
   * @returns {AuthUser}
   * @memberof ClientStorageService
   */
  getUser(): AuthUser {
    const result =  this.storage.getKeyObjectValue(storageKeys[storageKeys.authUser]);
    if ( result ) {
      return result;
      // return this.storage.deserialiseJson(result, AuthUser);
    }
    return null;
  }

  setRoles( roles: AuthRole[]) {
    const user: AuthUser = this.getUser();
    user.roles = {data: roles};
    this.setUser(user);
  }
  /**
   * Get all roles from secured storage if they exist
   *
   * @returns {AuthRole[]} or null
   * @memberof SecureStorageService
   */
  getRoles(): AuthRole[]  {
    if (this.getUser()) {
      return this.getUser().roles.data;
    }
    return [];
  }

  /**
   * Get User profile data
   *
   * @returns {UserProfile}
   * @memberof SecureStorageService
   */
  public getUserProfile(): UserProfile {
    return this.storage.getKeyObjectValue(storageKeys[storageKeys.userProfile]);
  }

  /**
   * Set User Profile data
   *
   * @param {UserProfile} profile
   * @memberof SecureStorageService
   */
  public setUserProfile(profile: UserProfile) {
    this.storage.setObjectValue(storageKeys[storageKeys.userProfile], profile);
  }

  public setDomain(domain: string) {
    this.storage.setDomain(domain);
  }
}
