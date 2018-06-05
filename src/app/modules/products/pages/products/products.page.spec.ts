import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.page';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('ProductsComponent', () => {
  let page: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ ProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    page = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });
});
