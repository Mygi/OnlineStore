import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInventoryComponent } from './product-inventory.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { ProductMockData } from '../../../../mocks/data/products/product-mock-data.data';
import { ProductItem } from '../../models/product-detail.model';

describe('ProductInventoryComponent', () => {
  let component: ProductInventoryComponent;
  let fixture: ComponentFixture<ProductInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      declarations: [ ProductInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInventoryComponent);
    component = fixture.componentInstance;
    const products = new ProductMockData();
    const item = products.products.pop();
    component.productItem = new ProductItem(); // item.items.data[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
