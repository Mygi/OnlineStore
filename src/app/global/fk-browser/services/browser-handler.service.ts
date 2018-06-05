import { Injectable, Inject } from '@angular/core';

// rxjs
import { Observable, BehaviorSubject } from 'rxjs';

// Central
import { BrowserConfig } from '../browser-config';
import { BROWSER_CONFIG } from '../browser.config';

// import { }
import { AppVariables } from '../models/app-variables.model';
import { Browser, BrowserState, BrowserType } from '../models/browser.model';
import { Comment } from '@angular/compiler';

@Injectable()
export class BrowserHandlerService {
  private appVariables: BehaviorSubject<AppVariables>;
  private docReady: BehaviorSubject<boolean>;
  private stateChange: BehaviorSubject<BrowserState> = new BehaviorSubject<BrowserState>(BrowserState.init);

  constructor(@Inject(BROWSER_CONFIG) private config: BrowserConfig) {
    // Set Default values from config
    this.appVariables = new BehaviorSubject<AppVariables >({
      bannerHeight: config.bannerHeight,
      currentBodyClass: '',
      menuState: {
        open: false,
        subMenuOpen: false
      },
      browser: {
      browserState: BrowserState.loading,
      browserType: BrowserType.Chrome,
      browserVersion: '0',
      deviceWidth: config.defaultSceenWidth,
      deviceHeight: config.defaultSceenHeight,
      screenWidth: config.defaultBrowserWidth,
      screenHeight: config.defaultBrowserHeight,
      scrollX: 0,
      scrollY: 0
    }});
    this.docReady = new BehaviorSubject<boolean>(false);
  }
  getDocReady(): BehaviorSubject<boolean> {
    return this.docReady;
  }
  setPageLoading() {
    const copied = this.appVariables.getValue();
    copied.browser.browserState = BrowserState.loading;
    this.appVariables.next(copied);
    this.docReady.next(false);
    this.stateChange.next(BrowserState.loading);
  }
  setPageLoaded() {
    const copied = this.appVariables.getValue();
    copied.browser.browserState = BrowserState.loaded;
    this.appVariables.next(copied);
    this.stateChange.next(BrowserState.loaded);
  }
  setPageReady() {
    this.docReady.next(true);
    this.stateChange.next(BrowserState.loaded);
  }
  getBrowserState(): BehaviorSubject<BrowserState> {
    return this.stateChange;
  }
  startChange(): void {
    this.stateChange.next(BrowserState.beforeChange);
  }
  completeChange(): void {
    this.stateChange.next(BrowserState.afterChange);
  }
  validateChange(): void {
    this.stateChange.next(BrowserState.changeValid);
  }
  toggleMenu() {
    const copied = this.appVariables.getValue();
    copied.menuState.open = !copied.menuState.open;
    if (!copied.menuState.open) {
      copied.menuState.subMenuOpen = false;
    }
    this.appVariables.next(copied);
  }
  setSessionEnd() {
    this.stateChange.next(BrowserState.sessionEnded);
  }
  toggleSubMenu() {
    const copied = this.appVariables.getValue();
    copied.menuState.subMenuOpen = !copied.menuState.subMenuOpen;
    this.appVariables.next(copied);
  }

  setBannerHeight( newHeight: number ) {
    const copied = this.appVariables.getValue();
    copied.bannerHeight = newHeight;
    this.appVariables.next(copied);
  }

  setWindowSize( x: number, y: number) {
    const copied = this.appVariables.getValue();
    copied.browser.screenWidth = x;
    copied.browser.screenHeight = y;
    this.appVariables.next(copied);
  }
  setDeviceSize(x: number, y: number) {
    const copied = this.appVariables.getValue();
    copied.browser.deviceWidth = x;
    copied.browser.deviceHeight = y;
    this.appVariables.next(copied);
  }

  setScrollPosition(x: number, y: number) {
    const copied = this.appVariables.getValue();
    copied.browser.scrollX = x;
    copied.browser.scrollY = y;
    this.appVariables.next(copied);
  }
  setBodyClass(cssClass: string ) {
    const copied = this.appVariables.getValue();
    copied.currentBodyClass = cssClass;
    this.appVariables.next(copied);
  }

  // Changes in global app variable state
  getAppVariables(): BehaviorSubject<AppVariables> {
    return this.appVariables;
  }
}
