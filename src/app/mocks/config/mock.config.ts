import { InjectionToken } from '@angular/core';
import { AppConfig } from '../../global/contracts/config/app-config';

export const APP_CONFIG = new InjectionToken<AppConfig>('mock.config');

export const MockConfig: AppConfig = {
    production: false,
    cookieExpiryHours: 1,
    cookiePath: '/',
    dataStore: 'InMemory',
    baseUrl: 'http://localhost:4444/assets/testData/',
    httpServiceUrls: {
        categories: 'category',
        products: 'products',
        wishlist: '',
        featuredProducts: 'featuredProducts',
        auth: 'auth',
        authUser: 'authUser',
        shop: 'shop',
        images: 'image',
        tags: 'tags',
        attributes: 'attributes',
        countries: '/assets/data/countries.json',
        userDetails: '/',
        passwordReset: '/password-reset',
        passwordResetConfirm: 'password-reset-confirm',
        shopForUser: 'private/users',
        banks: 'private/banks',
        shopProducts: 'private/shops',
        privateProducts: 'private/products',
        specifications: 'public/specificationTypes'
    },
    defaultDataSuffix: '',
    logoutUrl: '/home',
    loginUrl: '/login',
    cookieUrl: 'localhost'
};
