import { AppConfig } from '../app/global/contracts/config/app-config';

export const environment: AppConfig = {
  production: false,
  dataStore: 'inMemory',
  baseUrl: 'http://dev-api.thefinderskeepersmarketplace.com/v1/',
  httpServiceUrls: {
    categories: 'public/categories',
    products: 'public/products',
    privateProducts: 'private/products',
    wishlist: '',
    featuredProducts: 'public/products',
    auth: 'authenticate',
    authUser: 'getUser',
    shop: 'private/shops',
    shopForUser: 'private/users',
    images: 'image',
    tags: 'public/tags',
    attributes: 'public/attributes',
    countries: '/assets/data/countries.json',
    userDetails: 'private/users',
    passwordReset: 'password-reset',
    passwordResetConfirm: 'password-reset-confirm',
    banks: 'private/banks',
    shopProducts: 'private/shops',
    specifications: 'public/specification-types'
  },
  defaultDataSuffix: '',
  logoutUrl: '/home',
  loginUrl: '/login',
  cookieUrl: 'fk-om-frontend-dev.s3-website-ap-southeast-2.amazonaws.com',
  cookiePath: '/',
  cookieExpiryHours: 24
};
