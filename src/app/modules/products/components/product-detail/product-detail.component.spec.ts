import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { NguCarouselModule } from '@ngu/carousel';
import { MocksModule } from '../../../../mocks/mocks.module';
import { ProductService } from '../../services/product.service';
import { ProductItemService } from '../../services/product-item.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NguCarouselModule, MocksModule],
      declarations: [ ProductDetailComponent ],
      providers: [ProductService, ProductItemService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
