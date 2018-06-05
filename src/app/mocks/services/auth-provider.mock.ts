import { AuthenticationProvider } from '../../global/contracts/services/authentication.provider';
import { AuthUser } from '../../modules/security/models/auth-user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserProfileContract } from '../../global/contracts/modules/user.contract';
import { UserProfile } from '../../modules/security/models/user-profile.model';
// Need to create a Mock Auth here!!
export class AuthProviderMock extends AuthenticationProvider {
    private _userProfile = new BehaviorSubject<UserProfile>(new UserProfile(9));
    subscribeAuthProfile(): BehaviorSubject<UserProfileContract> {
        return this._userProfile;
    }
    authenticate(userName: string, password: string): Observable<any> {
        throw new Error('Method not implemented.');
    }
    getAuthProfile(): UserProfileContract {
        return new UserProfile(1);
    }
    isAuthenticated(): boolean {
        return true;
    }
    login(userName: string, password: string): Observable<AuthUser> {
        const user: AuthUser = new AuthUser(1, 'test', 'case', 'test@test.com', '24 Nov 2017', true, {data: []});
        const subject: BehaviorSubject < AuthUser > = new BehaviorSubject<AuthUser>(user);
        return subject.asObservable();
    }
    logout(): boolean {
        return true;
    }
    getAuthToken(): string {
        return 'token';
    }
    checkRoles(expectedRoles: string[]): boolean {
       let pass = false;
        expectedRoles.forEach( role => {
        //    console.log(role);
        if (role.toLowerCase() === 'buyer') {
            pass = true;
        }
       });
       return pass;
    }
    hasRole(role: string): boolean {
        throw new Error('Method not implemented.');
    }
    getAuthUser(): AuthUser {
        return new AuthUser(1, 'test', 'case', 'test@test.com', '24 Nov 2017', true, { data: [] });
    }
    updateAuthProfile(profile: UserProfileContract) {
        return;
    }
    public refreshSession(): void {
        //
        // console.log('refreshed');
    }
}
