import { Component, OnInit } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';

// Models
import {FeaturedItem} from '../../models/featured-item.model';

// Services
import { FeaturedItemService } from '../../services/featured-item.service';
import { BrowserHandlerService } from '../../../../global/fk-browser/services/browser-handler.service';
import { ProductContract } from '../../../../global/contracts/modules/products.contract';

@Component({
  selector: 'app-feature-banner',
  templateUrl: './feature-banner.component.html',
  styleUrls: ['./feature-banner.component.scss']
})
export class FeatureBannerComponent implements OnInit {
  public featuredProducts: ProductContract[] = [];
  public carouselTile: NguCarousel;
  constructor(private dataService: FeaturedItemService, private browserHandler: BrowserHandlerService ) { }
  public slideHeight: number;

  ngOnInit() {
    this.getProducts();
    // carousel Could be placed in a seprate config file
      this.carouselTile = {
        grid: { xs: 1, sm: 1, md: 1, lg: 2, all: 0 },
        speed: 400,
        interval: 3000,
        point: {
          visible: false
        },
        load: 2,
        touch: true,
        loop: true,
        easing: 'cubic-bezier(0, 0, 0.2, 1)'
      };
      this.browserHandler.getAppVariables().subscribe( (val) => {
        this.slideHeight = val.browser.screenHeight - val.bannerHeight;
      });
  }

  public carouselTileLoad() {
  }

  getProducts() {
    this.dataService.getFeaturedItems().subscribe(
      data => { this.featuredProducts = data; },
      error => console.warn( error ),
      // () => console.log('Get all complete' + this.featuredProducts[0].caption)
      );
  }
}
