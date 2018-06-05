import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistSelecterComponent } from './wishlist-selecter.component';
import { WishlistService } from '../../services/wishlist.service';

describe('WishlistSelecterComponent', () => {
  let component: WishlistSelecterComponent;
  let fixture: ComponentFixture<WishlistSelecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistSelecterComponent ],
      providers: [ WishlistService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistSelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
