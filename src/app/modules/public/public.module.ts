// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// 3rd Party
// import 'hammerjs';
import { NguCarouselModule } from '@ngu/carousel';

// dependent modules
import { SecurityModule } from '../../modules/security/security.module';

// Routing
import { ProductsModule } from '../../modules/products/products.module';
import { CollectionsModule } from '../../modules/collections/collections.module';

// Project Pages
import { HomePageComponent } from './pages/home/home.page';
import { WishlistComponent } from './pages/wishlist/wishlist.page';

// Services - should move I think
import { FeaturedItemService } from './services/featured-item.service';

// Components
import { FeatureBannerComponent } from './components/feature-banner/feature-banner.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NguCarouselModule,
    ProductsModule,
    CollectionsModule
  ],
  declarations: [
    HomePageComponent,
     FeatureBannerComponent,
    NewsletterComponent,
    WishlistComponent
  ],
  exports: [],
  providers: [
    FeaturedItemService
  ]

})
export class PublicModule { }
