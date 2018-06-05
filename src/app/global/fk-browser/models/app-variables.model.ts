import { Browser } from './browser.model';

export interface MenuState {
    open: boolean;
    subMenuOpen: boolean;
}

export class AppVariables {
    bannerHeight: number;
    menuState: MenuState;
    currentBodyClass: string;
    browser: Browser;
}
