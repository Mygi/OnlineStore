import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistMenuComponent } from './wishlist-menu.component';
import { WishlistService } from '../../services/wishlist.service';

describe('WishlistMenuComponent', () => {
  let component: WishlistMenuComponent;
  let fixture: ComponentFixture<WishlistMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistMenuComponent ],
      providers: [WishlistService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
