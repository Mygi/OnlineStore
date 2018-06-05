// Core
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

// Services
import { BrowserHandlerService } from '../../../../global/fk-browser/services/browser-handler.service';
import { WishlistService } from '../../../../core/wishlist/services/wishlist.service';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { AppVariables } from '../../../../global/fk-browser/models/app-variables.model';
import { Wishlist } from '../../../../core/wishlist/models/wishlist.model';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  isOpen = false;

  showSubMenu = false;
  isAuthenticated = false;
  showSearch = false;
  // To be computed
  menuHeight = 0;
  // To move to config/services
  screenWidth = 0;
  smallScreenWidth = 992;

  cartItems = 12;
  wishlistItems = 0;
  constructor(private domService: BrowserHandlerService,
              private router: Router, private service: WishlistService, private auth: AuthenticationProvider ) { }

  ngOnInit() {

    this.domService.getAppVariables().subscribe( (val) => {
      this.setMenuState(val);
      this.isAuthenticated = this.auth.isAuthenticated();
      });

    this.service.getWishlist().subscribe( (wishlist) => {
      this.wishlistItems = this.getWishListItems(wishlist);
    });

    this.isAuthenticated = this.auth.isAuthenticated();
  }

  getWishListItems(list: Wishlist): number {
    return list.products.length;
  }
  setMenuState(val: AppVariables): void {
    this.isOpen = val.menuState.open;
    // Move this logic to the service if a global Height is required
    this.showSubMenu = val.menuState.subMenuOpen;
    this.menuHeight = val.browser.screenHeight - val.bannerHeight;
    this.screenWidth = val.browser.screenWidth;
    if (this.screenWidth < this.smallScreenWidth) {
      this.menuHeight += 10;
    }
  }

  toggleMenu() {
    this.domService.toggleMenu();
    }

  launchSubMenu() {
    this.domService.toggleSubMenu();
    return false;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  showLoginStyle() {
    if (this.screenWidth < this.smallScreenWidth ) {
      return 'none';
    }
    return 'block';
  }
}
