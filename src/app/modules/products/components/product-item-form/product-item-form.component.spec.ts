import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemFormComponent } from './product-item-form.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { ProductInventoryComponent } from '../product-inventory/product-inventory.component';
import { ProductItemImageComponent } from '../product-item-image/product-item-image.component';
import { ProductSpecificationsComponent } from '../product-specifications/product-specifications.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProductMockData } from '../../../../mocks/data/products/product-mock-data.data';
import { ProductService } from '../../services/product.service';
import { ProductItemListSortPipe } from '../../pipes/product-item-list.pipe';
import { ProductItemService } from '../../services/product-item.service';

describe('ProductItemFormComponent', () => {
  let component: ProductItemFormComponent;
  let fixture: ComponentFixture<ProductItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule, OverlayPanelModule],
      declarations: [ ProductItemFormComponent, ProductPriceComponent, ProductInventoryComponent, ProductItemImageComponent,
      ProductSpecificationsComponent  ],
      providers: [ProductService, ProductItemService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemFormComponent);
    component = fixture.componentInstance;
    const products = new ProductMockData();
    const item = products.products.pop();
    // component.productItem = item.items.data[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
