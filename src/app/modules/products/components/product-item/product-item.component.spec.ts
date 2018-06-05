import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { FormsModule } from '@angular/forms';
import { MocksModule } from '../../../../mocks/mocks.module';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductInventoryComponent } from '../product-inventory/product-inventory.component';
import { ProductSpecificationsComponent } from '../product-specifications/product-specifications.component';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { ProductItemFormComponent } from '../product-item-form/product-item-form.component';
import { ProductItemImageComponent } from '../product-item-image/product-item-image.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { TagInputModule } from 'ngx-chips';
import { ProductItemService } from '../../services/product-item.service';
import { BlockUIModule } from 'primeng/blockui';
import { GroupByAttributePipe } from '../../pipes/group-by-attribute.pipe';
import { GallerySortPipe } from '../../pipes/gallery-sort.pipe';
import { ShopService } from '../../../shop/services/shop.service';
import { BrowserHandlerService } from '../../../../global/fk-browser/services/browser-handler.service';
import { BROWSER_CONFIG, FKBrowserConfig } from '../../../../global/fk-browser/browser.config';
xdescribe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule, RouterModule,
        OverlayPanelModule, DialogModule, TagInputModule,
      BlockUIModule],
      declarations: [ ProductItemComponent, ProductPriceComponent,
      ProductAttributesComponent, ProductInventoryComponent, ProductSpecificationsComponent,
      ProductImagesComponent, ProductItemFormComponent, ProductItemImageComponent, GroupByAttributePipe, GallerySortPipe],
      providers: [ProductService, ProductItemService, ShopService, BrowserHandlerService,
        { provide: BROWSER_CONFIG, useValue: FKBrowserConfig }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
