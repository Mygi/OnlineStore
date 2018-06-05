import { AuthUser } from '../../../modules/security/models/auth-user.model';
import { UserProfile } from '../../../modules/security/models/user-profile.model';
import { AuthRole } from '../../../modules/security/models/auth-role.model';
export class AuthUserMock {
    authUsers: AuthUser[] = [];
    constructor() {
        const authAdminRole: AuthRole = new AuthRole(1, 'Admin', 'Admin', 'Admin', []);
        const authSellerRole: AuthRole = new AuthRole(1, 'Seller', 'Seller', 'Seller', []);
        const authBuyerRole: AuthRole = new AuthRole(1, 'Buyer', 'Buyer', 'Buyer', []);

        const authProfile: UserProfile = new UserProfile(1);
        const authUser: AuthUser = new AuthUser(1, 'Sarah', 'Thornton', 'sarah@thefinderskeepers.com',
            new Date().toISOString(), true, {data: [authAdminRole, authBuyerRole, authSellerRole]}, authProfile);

        const authProfile2: UserProfile =
            new UserProfile(2);
        const authUser2: AuthUser = new AuthUser(2, 'Andrew', 'Glenn', 'andrew.glenn@southgatehouse.com.au',
            new Date().toISOString(), true, { data: [authAdminRole, authBuyerRole, authSellerRole] }, authProfile);


        const authProfile4: UserProfile = new UserProfile(1);
        const authUser4: AuthUser = new AuthUser(3, 'Nicole', 'Jay', 'nik@thefinderskeepers.com',
            new Date().toISOString(), true, { data: [authAdminRole, authBuyerRole, authSellerRole] }, authProfile);

        const authProfile5: UserProfile = new UserProfile(1);
        const authUser5: AuthUser = new AuthUser(4, 'Luke Thornton', 'Thornton', 'luke@thefinderskeepers.com',
            new Date().toISOString(), true, { data: [authAdminRole, authBuyerRole, authSellerRole] }, authProfile);

        const authProfile6: UserProfile = new UserProfile(1);
        const authUser6: AuthUser = new AuthUser(5, 'Teresa', 'Testcase', 'test@thefinderskeepers.com',
            new Date().toISOString(), true, {data: [authSellerRole]}, authProfile);

        this.authUsers.push(authUser);
        this.authUsers.push(authUser2);
        this.authUsers.push(authUser6);
        this.authUsers.push(authUser4);
        this.authUsers.push(authUser5);
        this.authUsers.push(authUser6);
    }

}
