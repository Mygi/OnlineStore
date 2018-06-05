import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFormComponent } from './shop-form.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { MessagesModule } from 'primeng/messages';
import { ShopService } from '../../services/shop.service';
import { DialogModule } from 'primeng/dialog';
import { BankingService } from '../../services/banking.service';
import { Shop } from '../../models/shop.model';

describe('ShopFormComponent', () => {
  let component: ShopFormComponent;
  let fixture: ComponentFixture<ShopFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule, MessagesModule, DialogModule],
      declarations: [ ShopFormComponent ],
      providers: [ ShopService, BankingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load default banking', () => {
    component.arrangeShopData(new Shop());
    expect(component.shop.id).toBeUndefined();
    expect(component.shop.banking).toBeDefined();
  });
  it('should load a shop', () => {
    const shop = new Shop();
    shop.id = 1;
    component.arrangeShopData(shop);
    expect(component.shop.id).toBe(1);
  });
});
