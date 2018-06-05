import { TestBed, inject } from '@angular/core/testing';
import { CategoryMockData } from '../../../mocks/data/category/category-mock-data.data';
import { DynamicNestedCategoriesService } from './dynamic-nested-categories.service';
import { Category } from '../models/categories.model';

describe('DynamicNestedCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicNestedCategoriesService]
    });
  });

  it('should be created', inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
    expect(service).toBeTruthy();
  }));
  it('should increment depth', inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
    const categories = new CategoryMockData();
    // well this looks silly!
    expect(service.getCurrentDepth()).toEqual(0);
    service.init(categories.categories.categories);
    expect(service.getCurrentDepth()).toEqual(1);
    service.toggle(1, 0);
    expect(service.getCurrentDepth()).toEqual(1);
  }));
  // Check each catgeory is found in both models and matches
  it('should set initial categories', inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
    const categories = new CategoryMockData();
    // well this looks silly!
    expect(service.getCurrentDepth()).toEqual(0);
    service.init(categories.categories.categories);
    expect(service.getCategories(0).length).toEqual(categories.categories.categories.length);
    expect(service.getCategories(0)[0]).toEqual(categories.categories.categories[0]);
    service.getCategories(0).forEach(element => {
      expect(categories.categories.categories.find(x => x.id === element.id)).toEqual(element);
    });
  }));

  it('should set filter on initial categories', inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
    const categories = new CategoryMockData();
    // well this looks silly!
    expect(service.getCurrentDepth()).toEqual(0);
    service.init(categories.categories.categories);
    expect(service.getCategories(0).findIndex(x => x.id === 4)).toEqual(3);
    service.applyFilters([1, 2, 3], 0);
    expect(service.getCategories(0).length).toBe(3);
    expect(service.getCategories(0).findIndex(x => x.id === 4)).toEqual(-1);
    expect(service.getCategories(0).findIndex(x => x.id === 1)).toEqual(0);
    expect(service.getCategories(0).findIndex(x => x.id === 2)).toEqual(1);
    expect(service.getCategories(0).findIndex(x => x.id === 3)).toEqual(2);

    service.applyFilters([4], 0);
    expect(service.getCategories(0).length).toBe(0);
  }));

  it('should create empty set for getCategories of greater depth than current model',
     inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
    const categories = new CategoryMockData();
    // well this looks silly!
    expect(service.getCurrentDepth()).toEqual(0);
    service.init(categories.categories.categories);
    expect(service.getCategories(0).length).toEqual(8);
    expect(service.getCategories(1).length).toBe(0);
    expect(service.getCategories(2).length).toBe(0);
  }));
  it('should toggle on selected category One level depth',
    inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);
      expect(service.getCategories(0).length).toEqual(8);
      expect(service.getCategories(1).length).toBe(0);

      expect(service.toggle(1, 0).length).toBe(4);
      expect(service.getCategories(1).length).toBe(4);
      expect(service.getCurrentDepth()).toEqual(1);
      expect(service.findCategoryAtDepth(53, 1).name).toEqual('Framed Artworks');
      expect(service.getCategories(3).length).toBe(0);


      expect(service.toggle(2, 0).length).toBe(6);
      expect(service.getCategories(1).length).toBe(6);
      expect(service.getCategories(2).length).toBe(0);
      expect(service.findCategoryAtDepth(47, 1).name).toEqual('Toys');
      expect(service.getCurrentDepth()).toEqual(1);

      // should not toggle value not found in available levels
      // Old state remains
      expect(service.toggle(12, 1).length).toBe(0);
      expect(service.getCategories(1).length).toBe(6);
      expect(service.getCategories(2).length).toBe(0);
      expect(service.findCategoryAtDepth(47, 1).name).toEqual('Toys');
      expect(service.getCurrentDepth()).toEqual(1);

    }));
  it('should toggle on selected category Two levels depth',
    inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);
      expect(service.getCategories(0).length).toEqual(8);
      expect(service.getCategories(1).length).toBe(0);

      expect(service.toggle(2, 0).length).toBe(6);

      expect(service.toggle(47, 1).length).toBe(1);
      expect(service.getCategories(1).length).toBe(6);
      expect(service.getCategories(2).length).toBe(1);
      expect(service.findCategoryAtDepth(55, 2).name).toEqual('Soft Toys');
      expect(service.getCurrentDepth()).toEqual(2);

      expect(service.toggle(55, 2)).toBeTruthy();
      expect(service.getCurrentDepth()).toEqual(3);
      expect(service.getCategories(3).length).toBe(0);

      // should not toggle value not found in available levels
      expect(service.toggle(47, 2).length).toBe(0);

      // // Old state remains
      expect(service.toggle(1, 0).length).toBe(4);
      expect(service.getCategories(1).length).toBe(4);
      expect(service.getCategories(2).length).toBe(0);
      expect(service.getCurrentDepth()).toEqual(1);

    }));
  it('return full model but dynamically created',
    inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);

      let data = service.getFullModel();
      expect(data.length).toEqual(2);
      expect(data[0].length).toEqual(8);
      expect(data[1].length).toEqual(0);
      expect(service.toggle(1, 0).length).toBe(4);
      data = service.getFullModel();
      expect(data[1].length).toEqual(4);
    }));
    // Note the necessity of toggle before insertion!!!important
  it('can insert a category',
    inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);

      const newCategory2 = new Category(100, 0, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(0, newCategory2);
      expect(service.getCategories(0).length).toBe(9);

      expect(service.toggle(1, 0).length).toEqual(4);
      expect(service.getCategories(1).length).toBe(4);
      const newCategory = new Category(99, 1, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(5);

      expect(service.toggle(99, 1).length).toEqual(0);
      const newCategory3 = new Category(101, 99, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(2, newCategory3);
      expect(service.getCategories(2).length).toBe(1);
    }));
  it('cannot insert a duplicate category ID',
    inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);

      const newCategory2 = new Category(100, 0, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(0, newCategory2);
      expect(service.getCategories(0).length).toBe(9);

      const newCategory3 = new Category(100, 0, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(0, newCategory2);
      expect(service.getCategories(0).length).toBe(9);
    }));
  it('cannot insert category with invalid Parent',
    inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);
      expect(service.toggle(1, 0).length).toEqual(4);

      expect(service.getCategories(1).length).toBe(4);
      const newCategory = new Category(99, 1, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(0, newCategory);
      expect(service.getCategories(1).length).toBe(4);
      expect(service.getCategories(0).length).toBe(8);

      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(5);
    }));
  // This spec could be to raise orphans, delete or merge to another. Leave for now
  // Does allow implicit deletion through toggle option
  it('can delete a category and leaves orhpans unless using toggle function',
    inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);
      expect(service.toggle(1, 0).length).toEqual(4);

      expect(service.getCategories(1).length).toBe(4);
      const newCategory = new Category(99, 1, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(5);

      service.deleteCategory(99, 1);
      expect(service.getCategories(1).length).toBe(4);

      service.deleteCategory(1, 0);
      expect(service.getCategories(0).length).toBe(7);
      expect(service.getCategories(1).length).toBe(4);
      expect(service.toggle(1, 0).length).toEqual(0);
    }));

  it('cannot delete an unknown category',
    inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      service.init(categories.categories.categories);
      expect(service.toggle(1, 0).length).toEqual(4);
      expect(service.getCategories(1).length).toBe(4);

      service.deleteCategory(99, 1);
      expect(service.getCategories(1).length).toBe(4);

      service.deleteCategory(1, 1);
      expect(service.getCategories(1).length).toBe(4);

      service.deleteCategory(1, 0);
      expect(service.getCategories(0).length).toBe(7);
    }));

  it('will only insert a flat category',
    inject([DynamicNestedCategoriesService], (service: DynamicNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);
      expect(service.toggle(1, 0).length).toEqual(4);
      expect(service.getCategories(1).length).toBe(4);
      const newCategory3 = new Category(101, 99, 'test', 'test', 'slug', 'imageUr', []);
      const newCategory = new Category(99, 1, 'test', 'test', 'slug', 'imageUr', [newCategory3]);
      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(4);

      const newCategory2 = new Category(100, 0, 'test', 'test', 'slug', 'imageUr', [newCategory]);
      service.insertCategory(0, newCategory2);
      expect(service.getCategories(0).length).toBe(8);
    }));
});
