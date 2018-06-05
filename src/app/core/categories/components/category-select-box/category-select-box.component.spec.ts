import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySelectBoxComponent } from './category-select-box.component';
import { CategoryMockData } from '../../../../mocks/data/category/category-mock-data.data';

describe('CategorySelectBoxComponent', () => {
  let component: CategorySelectBoxComponent;
  let fixture: ComponentFixture<CategorySelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySelectBoxComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySelectBoxComponent);
    component = fixture.componentInstance;
    component.depth = 0;
    component.parentId = 1;
    const data = new CategoryMockData();
    component.categories = data.categories.categories;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise categories', () => {
    expect(component.depth).toEqual(0);
    expect(component.categories.length).toEqual(8);
  });

  it('should toggle a selected categories', () => {
    expect(component.depth).toEqual(0);
    // spyOn(component.toggled, 'emit');
    component.toggled.subscribe( result => {
      expect(result.depth).toEqual(0);
      expect(result.category.id).toEqual(1);
      expect(result.category.name).toEqual('Art & Illustration');
    });
    component.toggle('1');
    // component.addSelectedCategory();
  });
  it('should  add a selected categories', () => {
    expect(component.depth).toEqual(0);
    // spyOn(component.toggled, 'emit');
    component.addCategory.subscribe(result => {
      expect(result.depth).toEqual(0);
      expect(result.category.id).toEqual(1);
      expect(result.category.name).toEqual('Art & Illustration');
    });
    component.toggle('1');
    component.addSelectedCategory();
    // component.addSelectedCategory();
  });
});
