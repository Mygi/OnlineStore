import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChipsComponent } from './category-chips.component';
import { CategorySelecterService } from '../../services/category-selecter.service';

import { CategoryAlias } from '../../models/categories.model';
describe('CategoryChipsComponent', () => {
  let component: CategoryChipsComponent;
  let fixture: ComponentFixture<CategoryChipsComponent>;
  let categorySelecterService: CategorySelecterService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryChipsComponent ],
      providers: [CategorySelecterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialise selected Items', () => {
    categorySelecterService = TestBed.get(CategorySelecterService);
    categorySelecterService.addSelectedCategory(new CategoryAlias(1, 'test', 0, 0));
    categorySelecterService.addSelectedCategory(new CategoryAlias(2, 'test', 0, 0));
    component.selectedCategories = categorySelecterService.getSelectedCatageories();
    expect(component.selectedCategories).toEqual(categorySelecterService.getSelectedCatageories());
    expect(component.selectedCategories.length).toEqual(2);
    // component.removeShopCategory(1);
    // expect(component.selectedCategories.length).toEqual(1);
  });
  it('should emit deleted item', () => {
    categorySelecterService = TestBed.get(CategorySelecterService);
    categorySelecterService.addSelectedCategory(new CategoryAlias(1, 'test', 0, 0));
    categorySelecterService.addSelectedCategory(new CategoryAlias(2, 'test', 0, 0));
    component.selectedCategories = categorySelecterService.getSelectedCatageories();
    expect(component.selectedCategories).toEqual(categorySelecterService.getSelectedCatageories());
    expect(component.selectedCategories.length).toEqual(2);
    component.removed.subscribe(deletedItem =>
      expect(deletedItem.id).toEqual(1)
    );
    component.removeShopCategory(1);
    // expect(component.selectedCategories.length).toEqual(1);
  });
});
