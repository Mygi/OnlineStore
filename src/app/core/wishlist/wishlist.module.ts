import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from './services/wishlist.service';
import { WishlistMenuComponent } from './components/wishlist-menu/wishlist-menu.component';
import { WishlistSelecterComponent } from './components/wishlist-selecter/wishlist-selecter.component';
import { WishlistItemComponent } from './components/wishlist-item/wishlist-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [WishlistMenuComponent, WishlistSelecterComponent, WishlistItemComponent],
  providers: [
    WishlistService,
  ],
  exports: [
    WishlistMenuComponent,
  WishlistSelecterComponent]
})
export class WishlistModule { }
