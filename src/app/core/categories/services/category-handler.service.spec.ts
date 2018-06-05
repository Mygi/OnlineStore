import { TestBed, inject } from '@angular/core/testing';

import { CategoryHandlerService } from './category-handler.service';
import { CategoryMockData } from '../../../mocks/data/category/category-mock-data.data';
import { FilteredOrthogonalNestedCategoriesService } from './filtered-orthogonal-nested-categories.service';
import { CategoryAlias, Category } from '../models/categories.model';
import { CategorySelecterService } from './category-selecter.service';
import { CategoryService } from './category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, FKConfig } from '../../../app.config';
import { MocksModule } from '../../../mocks/mocks.module';

describe('CategoryHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      providers: [CategoryHandlerService, FilteredOrthogonalNestedCategoriesService, CategorySelecterService,
        CategoryService,
      ]
    });
  });

  it('should be created', inject([CategoryHandlerService], (service: CategoryHandlerService) => {
    expect(service).toBeTruthy();
  }));

  it('should add catagories with any parent ', inject([CategoryHandlerService], (service: CategoryHandlerService) => {
    const data: CategoryMockData = new CategoryMockData();
    expect(service.hasLevel(0)).toBeTruthy();
    const nestedHandler: FilteredOrthogonalNestedCategoriesService = TestBed.get(FilteredOrthogonalNestedCategoriesService);
    nestedHandler.init(data.categories.categories);
    expect(service.getCategories(0).length).toEqual(8);
    service.addCategory({ depth: 1, category: data.categories.categories[0].subCategories[1] });

    expect(service.getAllFromList().length).toEqual(2);

    service.addCategory({ depth: 1, category: data.categories.categories[1] });
    expect(service.getAllFromList().length).toEqual(3);
  }));

  it('should remove catagories with any child ', inject([CategoryHandlerService], (service: CategoryHandlerService) => {
    const data: CategoryMockData = new CategoryMockData();
    expect(service.hasLevel(0)).toBeTruthy();
    const nestedHandler: FilteredOrthogonalNestedCategoriesService = TestBed.get(FilteredOrthogonalNestedCategoriesService);
    nestedHandler.init(data.categories.categories);
    expect(service.getCategories(0).length).toEqual(8);
    service.addCategory({ depth: 1, category: data.categories.categories[0].subCategories[1] });

    expect(service.getAllFromList().length).toEqual(2);

    service.addCategory({ depth: 1, category: data.categories.categories[1] });
    expect(service.getAllFromList().length).toEqual(3);

    service.removeCategory(new CategoryAlias(1, 'Test', null, 0), 0);
    expect(service.getAllFromList().length).toEqual(1);

    service.removeCategory(new CategoryAlias(2, 'Test', null, 0), 0);
    expect(service.getAllFromList().length).toEqual(0);
  }));
  it('should init selected catagories', inject([CategoryHandlerService], (service: CategoryHandlerService) => {
    expect(service.getAllFromList().length).toEqual(0);
    const catSelecter: CategorySelecterService = TestBed.get(CategorySelecterService);
    catSelecter.addSelectedCategory(new CategoryAlias(111, 'A', 1, 1));
    expect(service.getAllFromList().length).toEqual(1);
  }));

  it('should init first level of catagories', inject([CategoryHandlerService], (service: CategoryHandlerService) => {
    const data: CategoryMockData = new CategoryMockData();
    expect(service.hasLevel(0)).toBeTruthy();
    const nestedHandler: FilteredOrthogonalNestedCategoriesService = TestBed.get(FilteredOrthogonalNestedCategoriesService);
    nestedHandler.init(data.categories.categories);
    expect(service.getCategories(0).length).toEqual(8);
  }));

  it('should toggle to second level of catagories and update level and parentId',
  inject([CategoryHandlerService], (service: CategoryHandlerService) => {
    const data: CategoryMockData = new CategoryMockData();
    expect(service.hasLevel(0)).toBeTruthy();
    const nestedHandler: FilteredOrthogonalNestedCategoriesService = TestBed.get(FilteredOrthogonalNestedCategoriesService);
    nestedHandler.init(data.categories.categories);
    expect(service.getCategories(0).length).toEqual(8);

    service.onToggled({ depth: 0, category: new Category(1, null, '', '', '', '', []) });
    expect(service.hasLevel(1)).toBeTruthy();

    expect(service.getCategories(1).length).toEqual(4);

    service.onToggled({ depth: 0, category: new Category(2, null, '', '', '', '', []) });
    expect(service.getCategories(1).length).toEqual(6);

    service.onToggled({ depth: 1, category: new Category(47, null, '', '', '', '', []) });
    expect(service.hasLevel(2)).toBeTruthy();
    expect(service.getParentId(1)).toEqual(2);
    expect(service.getParentId(2)).toEqual(47);
    expect(service.getCategories(2).length).toEqual(1);

    // faulty toggle
    service.onToggled({ depth: 1, category: new Category(99, null, '', '', '', '', []) });
    expect(service.hasLevel(2)).toBeTruthy();
    expect(service.getCategories(2).length).toEqual(0);

    // Levels should drop!
    service.onToggled({ depth: 0, category: new Category(2, null, '', '', '', '', []) });
    expect(service.getCategories(1).length).toEqual(6);
    expect(service.hasLevel(2)).toBeFalsy();
    expect(service.getParentId(1)).toEqual(2);
    expect(service.getParentId(2)).toBeUndefined();
    }));
  it('should getLevels ', inject([CategoryHandlerService], (service: CategoryHandlerService) => {
    const data: CategoryMockData = new CategoryMockData();
    expect(service.hasLevel(0)).toBeTruthy();
    const nestedHandler: FilteredOrthogonalNestedCategoriesService = TestBed.get(FilteredOrthogonalNestedCategoriesService);
    nestedHandler.init(data.categories.categories);
    expect(service.getCategories(0).length).toEqual(8);
    expect(service.getLevels().length).toEqual(4);
    // console.log(service.getLevels());
    expect(service.getLevels()[0]).toEqual(0);
  }));
});
