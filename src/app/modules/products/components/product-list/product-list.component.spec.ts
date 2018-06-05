import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { ProductService } from '../../services/product.service';
import { PaginatorModule } from 'primeng/paginator';
import { ProductSearchPipe } from '../../pipes/product-search.pipe';
import { ShopService } from '../../../shop/services/shop.service';

xdescribe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule, PaginatorModule],
      declarations: [ProductListComponent, ProductSearchPipe ],
      providers: [ProductService, ShopService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
