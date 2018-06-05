import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.page';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MocksModule } from '../../../../mocks/mocks.module';
import { PageMocksModule } from '../../../../mocks/pageMocks.module';

xdescribe('ProductComponent', () => {
  let page: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PageMocksModule],
      declarations: [ProductComponent],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    page = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });
});
