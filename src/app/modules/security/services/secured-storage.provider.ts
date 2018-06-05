// Models
import { Auth, AuthUser } from '../models/auth-user.model';
import { AuthRole } from '../models/auth-role.model';
import { UserProfile } from '../models/user-profile.model';
import { UserWithProfile } from '../../../global/contracts/modules/user.contract';

// This needs to go into a contract
/**
 *
 * Abstract class to allow the Dependency injection in angular
 * It serves little other purpose
 * @export
 * @abstract
 * @class SecuredStorageProvider
 */
export abstract class SecuredStorageProvider {
    /**
     * @method setAuth
     * @memberof iStorageService
     */
    public abstract setAuthToken(token: string);
    public abstract getAuthToken(): string;
    public abstract setUser(auth: AuthUser);
    public abstract getUser(): AuthUser;
    public abstract setRoles( roles: AuthRole[] );
    public abstract getRoles(): AuthRole[] ;
    public abstract getUserProfile(): UserProfile;
    public abstract setUserProfile(profile: UserProfile);
    public abstract deleteStorage();
    public abstract setDomain(domain: string);
}
/**
 * Keys for storage - this can be reused
 * with http as well
 *
 * @export
 * @enum {number}
 */
export enum storageKeys {
    auth,
    authUser,
    userProfile,
    authRoles,
    authToken
}
