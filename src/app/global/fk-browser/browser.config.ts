// Core Imports
import { InjectionToken } from '@angular/core';

// local imports
import { BrowserConfig } from './browser-config';

//  Create Token
export const BROWSER_CONFIG = new InjectionToken<BrowserConfig>('app.config');

export const FKBrowserConfig: BrowserConfig = {
    defaultBrowserHeight: 980,
    defaultBrowserWidth: 1440,
    defaultSceenHeight: 980,
    defaultSceenWidth: 1440,
    bannerHeight: 142
};
