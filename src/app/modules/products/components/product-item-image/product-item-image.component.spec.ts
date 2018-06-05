import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemImageComponent } from './product-item-image.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { ImageMock } from '../../../../mocks/data/file/image.mock';
import { ProductMockData } from '../../../../mocks/data/products/product-mock-data.data';

describe('ProductItemImageComponent', () => {
  let component: ProductItemImageComponent;
  let fixture: ComponentFixture<ProductItemImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      declarations: [ ProductItemImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemImageComponent);
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
