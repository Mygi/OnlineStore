// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// FK Modules
import { CoreInterfaceModule } from '../../core/core-interface/core-interface.module';
import { BlockUIModule } from 'primeng/blockui';
// services
import { ProductService } from './services/product.service';

// components
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductGridItemComponent } from './components/product-grid-item/product-grid-item.component';
import { ProductPriceComponent } from './components/product-price/product-price.component';
import { ProductInventoryComponent } from './components/product-inventory/product-inventory.component';
import { ProductSpecificationsComponent } from './components/product-specifications/product-specifications.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import { ProductAttributesComponent } from './components/product-attributes/product-attributes.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ProductItemFormComponent } from './components/product-item-form/product-item-form.component';
import { ProductItemImageComponent } from './components/product-item-image/product-item-image.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagInputModule } from 'ngx-chips';
import { ProductItemService } from './services/product-item.service';
import { PanelModule } from 'primeng/panel';
import { NguCarouselModule } from '@ngu/carousel';
import { ProductItemListSortPipe } from './pipes/product-item-list.pipe';
import { GroupByAttributePipe } from './pipes/group-by-attribute.pipe';
import { DragDropModule } from 'primeng/dragdrop';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { GallerySortPipe } from './pipes/gallery-sort.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { ProductComponent } from './pages/product/product.page';
import { ProductsComponent } from './pages/products/products.page';
import { ProductRoutesModule } from './products.routes';
import { JwtInterceptor } from '@auth0/angular-jwt';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CoreInterfaceModule,
    OverlayPanelModule,
     TagInputModule,
    NguCarouselModule,
    BlockUIModule,
    DragDropModule,
    PaginatorModule,
    ProductRoutesModule
  ],
  declarations: [
    ProductDetailComponent,
    ProductGridItemComponent,
    ProductPriceComponent,
    ProductInventoryComponent,
    ProductSpecificationsComponent,
    ProductImagesComponent,
    ProductAttributesComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductItemFormComponent,
    ProductItemImageComponent,
    ProductItemListSortPipe,
    GroupByAttributePipe,
    ProductSearchPipe,
    GallerySortPipe,
    ProductComponent,
    ProductsComponent
    ],
  providers: [ProductService, ProductItemService,
  {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
  }],
  exports: [
    ProductGridItemComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductDetailComponent
  ]
})
export class ProductsModule { }
