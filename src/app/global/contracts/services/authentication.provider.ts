import { Observable, BehaviorSubject } from 'rxjs';

// Models
import { UserInterface, UserWithProfile, UserProfileContract } from '../modules/user.contract';

export interface AuthenticationProviderInterface {
    login(userName: string, password: string): Observable<UserInterface>;
    logout();
    // Handled by storage provider or Authentication provider I wonder? Too specific!
    // As couple to JWT
    getAuthToken(): string;
    checkRoles(expectedRoles: string[]): boolean;
    hasRole(role: string): boolean;
    getAuthUser(): UserWithProfile;
    isAuthenticated(): boolean;
    getAuthProfile(): UserProfileContract;
    refreshSession(): void;
    authenticate(userName: string, password: string): Observable<any>;
    subscribeAuthProfile(): BehaviorSubject<UserProfileContract>;
}

/**
 * Base Class for authentication Providers
 * @export
 * @abstract
 * @class BaseAuthenticationProvider
 * @implements {AuthenticationProvider}
 */
export abstract class AuthenticationProvider implements AuthenticationProviderInterface {

    abstract login(userName: string, password: string): Observable<UserInterface>;
    abstract logout(): boolean;
    // Handled by storage provider or Authentication provider I wonder?
    abstract getAuthToken(): string;
    abstract checkRoles(expectedRoles: string[]): boolean;
    abstract hasRole(role: string): boolean;
    abstract getAuthUser(): UserWithProfile;
    abstract isAuthenticated(): boolean;
    abstract getAuthProfile(): UserProfileContract;
    abstract updateAuthProfile(profile: UserProfileContract);
    abstract refreshSession(): void;
    abstract authenticate(userName: string, password: string): Observable<any>;
    abstract subscribeAuthProfile(): BehaviorSubject<UserProfileContract>;
}
