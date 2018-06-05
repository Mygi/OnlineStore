import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpecificationsComponent } from './product-specifications.component';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { MocksModule } from '../../../../mocks/mocks.module';
import { ProductMockData } from '../../../../mocks/data/products/product-mock-data.data';
import { ProductItemService } from '../../services/product-item.service';
import { ProductItem } from '../../models/product-detail.model';

describe('ProductSpecificationsComponent', () => {
  let component: ProductSpecificationsComponent;
  let fixture: ComponentFixture<ProductSpecificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MocksModule,
      OverlayPanelModule
    ],
      declarations: [ ProductSpecificationsComponent ],
      providers: [ProductItemService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecificationsComponent);
    component = fixture.componentInstance;
    const products = new ProductMockData();
    const item = products.products.pop();
    component.productItem = new ProductItem();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
