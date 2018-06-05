import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// config
import { BROWSER_CONFIG, FKBrowserConfig } from './browser.config';
// components
import { BrowserEventsComponent } from './components/browser-events/browser-events.component';

// services
import { BrowserHandlerService} from './services/browser-handler.service';
import { UserIdleModule } from 'angular-user-idle';
import { BlockUIModule } from 'primeng/blockui';
import { DialogModule } from 'primeng/dialog';
import { FkFormsModule } from '../../core/fk-forms/fk-forms.module';
@NgModule({
  imports: [
    CommonModule,
    UserIdleModule.forRoot({ idle: 1200, timeout: 6000, ping: 60 }),
    FkFormsModule
  ],
  exports: [
    BrowserEventsComponent
  ],
  providers: [
    BrowserHandlerService,
    { provide: BROWSER_CONFIG, useValue: FKBrowserConfig }
  ],
  declarations: [BrowserEventsComponent]
})
export class FKBrowserModule { }
