import { TestBed, inject } from '@angular/core/testing';

import { BrowserHandlerService } from './browser-handler.service';
import { BROWSER_CONFIG, FKBrowserConfig } from '../browser.config';
describe('BrowserHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserHandlerService, { provide: BROWSER_CONFIG, useValue: FKBrowserConfig } ]
    });
  });

  it('should be created', inject([BrowserHandlerService], (service: BrowserHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
