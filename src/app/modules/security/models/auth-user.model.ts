// 3rd party decorator
import { JsonObject, JsonProperty } from 'json2typescript';

// Dependant models
import { AuthRole, AuthRoleService } from './auth-role.model';
import { UserInterface, UserWithProfile, UserProfileContract } from '../../../global/contracts/modules/user.contract';
import { UserProfile } from './user-profile.model';


export class Auth {
    password: string;
    userID?: number;
    email: string;
    token?: string;
    /**
     * optional auth token request
     */
    constructor(username: string, password: string,  id?: number, token?: string) {
        this.password = password;
        this.email = username;
        if ( id ) {
            this.userID = id;
        }
        if ( token ) {
            this.token = token;
        }
    }
}
@JsonObject
export class AuthUser implements UserWithProfile {

    @JsonProperty('userID')
    public userID: number;

    @JsonProperty('emailAddress', String)
    public emailAddress: string;

    @JsonProperty('firstName', String)
    public firstName: string;

    @JsonProperty('lastName', String)
    public lastName: string;

    @JsonProperty('isVerified')
    public isVerified: boolean;

    @JsonProperty('createdDate', String)
    public createdDate: string;

    @JsonProperty('roles', AuthRoleService)
    public roles: AuthRoleService;

    // @JsonProperty('userProfile', UserProfile)
    public userProfile: UserProfile = new UserProfile(0);

    constructor( id?: number, userFirstName?: string, userLastName?: string, emailAddress?: string,
        creationDate?: string, isVerified?: boolean, roles?: AuthRoleService, userProfile?: UserProfile ) {
        this.userID         = id;
        this.firstName      = userFirstName;
        this.lastName       = userLastName;
        this.emailAddress   = emailAddress;
        this.createdDate   = creationDate;
        this.isVerified     = isVerified;
        this.roles          = roles;
        this.userProfile    = userProfile;
    }
    public copyTo(data: AuthUser): void {
        if (data !== undefined) {
            this.userID = data.userID;
            this.emailAddress = data.emailAddress;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.roles = data.roles;
            this.isVerified = data.isVerified;
            this.createdDate = data.createdDate;
        }
    }
    public getId(): number {
        return this.userID;
    }
    public getEmailAddress(): string {
        return this.emailAddress;
    }
    public getRoles() {
        return this.roles.data;
    }
    // public setRoles(data: any): void {
    getUserProfile(): UserProfileContract {
        return this.userProfile;
    }
    getName(): string {
        return this.firstName + ' ' + this.lastName;
    }
    // }

}

export class AuthUserService {
    @JsonProperty('data', AuthUser)
    data: AuthUser;
}
