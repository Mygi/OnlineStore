import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { MocksModule } from '../../../../mocks/mocks.module';
import { PageMocksModule } from '../../../../mocks/pageMocks.module';

xdescribe('ShopComponent', () => {
  let page: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PageMocksModule],
      declarations: [ShopComponent],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponent);
    page = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });
});
