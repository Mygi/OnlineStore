import { TypeContract } from './tag.contract';

export interface UserInterface {
    getEmailAddress(): string;
    getName(): string;
    getId(): number;
}
export interface RoleContract {
    roleID: number;
    label: string;
}
export interface UserWithRoles extends UserInterface {
    getRoles(): RoleContract[];
}

export interface UserProfileContract {
    getImageUrl(): string;
    getShopId(): number;
}
export interface UserWithProfile extends UserWithRoles {
    getUserProfile(): UserProfileContract;
}
