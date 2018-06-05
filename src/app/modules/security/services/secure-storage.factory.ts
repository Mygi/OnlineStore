
import { CookieService } from 'ngx-cookie-service';
import { SecureStorageService } from './secure-storage.service';
import { CookieStorageService } from '../../../core/storage/services/cookie-storage.service';
import { LocalStorageService } from '../../../core/storage/services/local-storage.service';
import { SecuredStorageProvider } from './secured-storage.provider';
import { AppConfig } from '../../../global/contracts/config/app-config';

// A factory for choosing a storage provider at run time
export let secureStorageServiceFactory = (cookieService: CookieService, config: AppConfig ) => {
    if ( navigator.cookieEnabled ) {
        const service = new CookieStorageService(cookieService, config);
        return new SecureStorageService(service);
    }
        return new SecureStorageService(new LocalStorageService());
};
