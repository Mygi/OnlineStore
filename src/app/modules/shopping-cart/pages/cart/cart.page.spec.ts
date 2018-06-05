import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartPageComponent } from './cart.page';
import { MocksModule } from '../../../../mocks/mocks.module';
import { PageMocksModule } from '../../../../mocks/pageMocks.module';

xdescribe('CartPageComponent', () => {
  let page: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PageMocksModule],
      declarations: [CartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageComponent);
    page = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });
});
