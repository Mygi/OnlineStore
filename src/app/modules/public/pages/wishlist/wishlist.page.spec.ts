import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistComponent } from './wishlist.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


// Config
import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { MocksModule } from '../../../../mocks/mocks.module';
import { PageMocksModule } from '../../../../mocks/pageMocks.module';

xdescribe('WishlistComponent', () => {
  let page: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PageMocksModule],
      declarations: [WishlistComponent],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    page = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });
});
