import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributesComponent } from './product-attributes.component';
import { FormsModule } from '@angular/forms';
import { MocksModule } from '../../../../mocks/mocks.module';
import { TagInputModule } from 'ngx-chips';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProductService } from '../../services/product.service';
import { ProductItemService } from '../../services/product-item.service';
import { ProductMockData } from '../../../../mocks/data/products/product-mock-data.data';
import { Product } from '../../models/product.model';

describe('ProductAttributesComponent', () => {
  let component: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule, TagInputModule, OverlayPanelModule],
      declarations: [ ProductAttributesComponent ],
      providers: [ProductItemService, ProductService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributesComponent);
    component = fixture.componentInstance;
    const products = new ProductMockData();
    const item = products.products.pop();
    component.product = new Product();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
