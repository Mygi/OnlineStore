// Core Imports
import { InjectionToken } from '@angular/core';
// Nested interface
export interface ServiceUrls {
    categories: string;
    products: string;
    wishlist: string;
    featuredProducts: string;
    auth: string;
    authUser: string;
    shop: string;
    shopForUser: string;
    images: string;
    tags: string;
    attributes: string;
    countries: string;
    userDetails: string;
    passwordReset: string;
    passwordResetConfirm: string;
    banks: string;
    shopProducts: string;
    privateProducts: string;
    specifications: string;
}

// Main interface
export interface AppConfig {
    baseUrl: string;
    production: boolean;
    httpServiceUrls: ServiceUrls;
    defaultDataSuffix: string;
    logoutUrl: string;
    loginUrl: string;
    cookieUrl: string;
    cookiePath: string;
    dataStore: string;
    cookieExpiryHours: number;
}
