import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieStorageService } from './services/cookie-storage.service';
import { LocalStorageService } from './services/local-storage.service';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [],
  providers: [
    CookieService,
    CookieStorageService,
    LocalStorageService]
})
export class StorageModule { }
