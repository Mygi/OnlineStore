import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceComponent } from './product-price.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MocksModule } from '../../../../mocks/mocks.module';
import { ProductMockData } from '../../../../mocks/data/products/product-mock-data.data';
import { ProductItem } from '../../models/product-detail.model';

describe('ProductPriceComponent', () => {
  let component: ProductPriceComponent;
  let fixture: ComponentFixture<ProductPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MocksModule,
        OverlayPanelModule
      ],
      declarations: [ ProductPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceComponent);
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
