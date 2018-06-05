// Core Imports
import { InjectionToken } from '@angular/core';

// local imports
import { environment } from '../environments/environment';
import { AppConfig } from './global/contracts/config/app-config';


export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');


// Arguably we could leave Enviornment variables and config separately
export const FKConfig: AppConfig = environment;
