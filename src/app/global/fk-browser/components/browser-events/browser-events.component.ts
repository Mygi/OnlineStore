// Core
import { Component, Renderer2, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, } from '@angular/router';

// 3rd party
import { UserIdleService } from 'angular-user-idle';
//
import { BrowserHandlerService } from '../../services/browser-handler.service';
import { AuthenticationProvider } from '../../../contracts/services/authentication.provider';
import { BrowserState } from '../../models/browser.model';

@Component({
  selector: 'app-browser-events',
  templateUrl: './browser-events.component.html',
  styleUrls: ['./browser-events.component.scss']
})
export class BrowserEventsComponent implements OnInit, AfterViewInit {
  blocked = false;
  sessionTime = 0;
  timeOut = false;
  idle = false;
  private _pingSubscribe;
  constructor(private router: Router, private renderer: Renderer2, private browserHandler: BrowserHandlerService,
    private userIdle: UserIdleService, private _auth: AuthenticationProvider) {}

  @HostListener('window:resize') onResize() {
    this.browserHandler.setWindowSize(window.innerWidth, window.innerHeight);
    this.browserHandler.setDeviceSize(window.outerWidth, window.outerHeight);
  }

  @HostListener('window:scroll') onScroll() {
    this.browserHandler.setScrollPosition( window.scrollX, window.scrollY );
  }
  @HostListener('window:waiting') onWaiting() {
    // console.log('wait');
  }
  @HostListener('document:readystatechange') onDocReady() {
    this.browserHandler.setPageReady();
    // console.log('ready');
  }
  ngOnInit() {
    this.browserHandler.setWindowSize( window.innerWidth, window.innerHeight );
    this.browserHandler.setDeviceSize(window.outerWidth, window.outerHeight );
    this.browserHandler.getAppVariables().subscribe((val) => {
      (val.browser.scrollY > val.bannerHeight) ?
        this.renderer.addClass(document.body, 'scrolled') : this.renderer.removeClass(document.body, 'scrolled');
      if ( val.menuState.open ) {
        this.renderer.addClass(document.body, 'menu-open');
        this.renderer.removeClass(document.body, 'scrolled');
        window.scrollTo(0, 0);
      } else {
        this.renderer.removeClass(document.body, 'menu-open');
      }
    });
    this.browserHandler.getBrowserState().subscribe(state => {
      if (state === BrowserState.beforeChange) {
        // this.blocked = true;
        if (this._auth.isAuthenticated()) {
          console.log('refreshed session');
          this.refresh();
        }
        // Browser
        this.browserHandler.validateChange();
      } else if (state === BrowserState.afterChange) {
        // console.log('done');
        this.blocked = false;
      } else if (state === BrowserState.sessionEnded) {
        if (this._pingSubscribe !== undefined) {
          this._pingSubscribe.unsubscribe();
        }
        this.userIdle.stopTimer();
      }
    });

    if (this._auth.isAuthenticated()) {
      // Start watching when user idle is starting.
      // Start watch when time is up.
      this.userIdle.startWatching();
      this._pingSubscribe = this.userIdle.ping$.subscribe( value =>
        this.checkIdleState(value));
  }
  }
  checkIdleState(value: number ) {
    console.log(value);
    if (value > (this.userIdle.getConfigValue().idle / this.userIdle.getConfigValue().ping)) {
      this.idle = true;
    }
    if (value > (this.userIdle.getConfigValue().timeout / this.userIdle.getConfigValue().ping)) {
      this.idle = false;
      this.timeOut = true;
    }
  }
  ngAfterViewInit(): void {

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationStart) {
       this.browserHandler.startChange();
       this.browserHandler.setPageLoading();
      }
      if (evt instanceof NavigationEnd) {
        this.browserHandler.setPageReady();
        if (this._pingSubscribe === undefined ) {
          if (this._auth.isAuthenticated()) {
            // Start watching when user idle is starting.
            // Start watch when time is up.
            this.userIdle.startWatching();
            this._pingSubscribe = this.userIdle.ping$.subscribe(value =>
              this.checkIdleState(value));
            }
        }
        this.renderer.addClass(document.body, 'end-loading');
        setTimeout(() => { this.startApp(); }, 1500);
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  startApp() {
    this.renderer.addClass(document.body, 'loaded');
    this.renderer.removeClass(document.body, 'end-loading');
    this.browserHandler.setPageLoaded();
    this.browserHandler.completeChange();
  }
  login() {
    if (this._pingSubscribe ) {
      this._pingSubscribe.unsubscribe();
    }
    this._auth.logout();
    this.timeOut = false;
    this.router.navigateByUrl('/login');
  }
  resetTimer() {
    // console.log('triggers');
    this.userIdle.stopTimer();
    if (this._pingSubscribe !== undefined) {
      this._pingSubscribe.unsubscribe();
    }
    this.userIdle.startWatching();
    this._pingSubscribe = this.userIdle.ping$.subscribe(value =>
      this.checkIdleState(value));
  }
  refresh() {
    this._auth.refreshSession();
    this.idle = false;
    this.resetTimer();
  }
}
