import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImagesComponent } from './product-images.component';
import { DialogModule } from 'primeng/dialog';
import { MocksModule } from '../../../../mocks/mocks.module';
import { GallerySortPipe } from '../../pipes/gallery-sort.pipe';
import { ProductService } from '../../services/product.service';

describe('ProductImagesComponent', () => {
  let component: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DialogModule,
      MocksModule],
      declarations: [ProductImagesComponent, GallerySortPipe ],
      providers: [ProductService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImagesComponent);
    component = fixture.componentInstance;
    component.images = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
