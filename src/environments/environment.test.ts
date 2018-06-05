// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { AppConfig } from '../app/global/contracts/config/app-config';

export const environment: AppConfig = {
    production: false,
    dataStore: 'inMemory',
    baseUrl: 'http://dev-api.thefinderskeepersmarketplace.com/v1/',
    httpServiceUrls: {
        categories: 'category',
        products: 'products',
        privateProducts: 'private/products',
        wishlist: '',
        featuredProducts: 'featuredProducts',
        auth: 'auth',
        authUser: 'authUser',
        shop: 'shop',
        shopForUser: 'private/users',
        images: 'image',
        tags: 'tags',
        attributes: 'attributes',
        countries: '/assets/data/countries.json',
        userDetails: 'authUser',
        passwordReset: '/password-reset',
        passwordResetConfirm: 'password-reset-confirm',
        banks: 'private/banks',
        shopProducts: 'private/shops',
        specifications: 'public/specification-types'
    },
    defaultDataSuffix: '',
    logoutUrl: '/home',
    loginUrl: '/login',
    cookieUrl: 'localhost',
    cookiePath: '/',
    cookieExpiryHours: 24
};
