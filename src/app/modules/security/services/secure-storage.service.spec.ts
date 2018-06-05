import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { SecureStorageService} from './secure-storage.service';
import { AuthUser } from '../models/auth-user.model';
import { StorageProvider } from '../../../global/contracts/services/storage.provider';
import { StorageModule } from '../../../core/storage/storage.module';
import { CookieStorageService } from '../../../core/storage/services/cookie-storage.service';
import { UserProfile } from '../models/user-profile.model';
import { Shop } from '../../shop/models/shop.model';
import { MockCoreModule } from '../../../mocks/mockCore.module';

export class TestModel {
    name: string;
    value: number;
    data: number[];
    constructor(name: string, value: number, data: number[]) {
        this.name = name;
        this.value = value;
        this.data = data;
    }
}

describe('SecureStorageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MockCoreModule],
            providers: [SecureStorageService, CookieService, { provide: StorageProvider, useClass: CookieStorageService }]
        });
    });

    it('should be created', inject([SecureStorageService], (service: SecureStorageService) => {
        expect(service).toBeTruthy();
    }));

    it('should store a token', inject([SecureStorageService], (service: SecureStorageService) => {
        service.setDomain('localhost');
        service.setAuthToken('token');
        expect(service.getAuthToken()).toEqual('token');
        service.deleteStorage();
        expect(service.getAuthToken()).toBeNull();
    }));

    // It dosn't set User Profile? but why not?
    it('should store an AuthUser', inject([SecureStorageService], (service: SecureStorageService) => {
        service.setDomain('localhost');
        const profile = new UserProfile(1);
        profile.shop = new Shop();
        profile.shop.id = 1;
        const user: AuthUser = new AuthUser(1, 'test', 'name', 'email@email.com', 'Date', true, {data: []},  profile);
        service.setUser(user);
        expect(service.getUser().userID).toEqual(user.userID);
        service.deleteStorage();
        expect(service.getUser()).toBeNull();
    }));
});

