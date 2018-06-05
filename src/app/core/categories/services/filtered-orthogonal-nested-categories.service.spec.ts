import { TestBed, inject } from '@angular/core/testing';
import { Category } from '../models/categories.model';
import { FilteredOrthogonalNestedCategoriesService } from './filtered-orthogonal-nested-categories.service';
import { CategoryMockData } from '../../../mocks/data/category/category-mock-data.data';

describe('FilteredOrthogonalNestedCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilteredOrthogonalNestedCategoriesService]
    });
  });

  it('should be created', inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
    expect(service).toBeTruthy();
  }));

  it('should set initial categories with shallow copy', inject([FilteredOrthogonalNestedCategoriesService],
    (service: FilteredOrthogonalNestedCategoriesService) => {
    const categories = new CategoryMockData();
    // well this looks silly!
    expect(service.getCurrentDepth()).toEqual(0);
    service.init(categories.categories.categories);
    expect(service.getCategories(0).length).toEqual(8);
    service.getCategories(0).forEach( cat =>
      expect(cat.subCategories.length).toEqual(0)
    );
    expect(service.getCategories(1).length).toEqual(46);
    expect(service.getCategories(2).length).toEqual(1);
    expect(service.getCategories(1)[45].name).toEqual('Fragrances');
  }));

  it('should toggle on selected category Two levels depth',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);
      expect(service.getCategories(0).length).toEqual(8);
      expect(service.getCategories(1).length).toBe(46);

      expect(service.toggle(2, 0).length).toBe(6);

      expect(service.toggle(47, 1).length).toBe(1);
      expect(service.getCategories(1).length).toBe(46);
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
      expect(service.getCategories(1).length).toBe(46);
      expect(service.getCategories(2).length).toBe(1);
      expect(service.getCurrentDepth()).toEqual(1);

    }));

  it('should set initial categories with shallow copy', inject([FilteredOrthogonalNestedCategoriesService],
     (service: FilteredOrthogonalNestedCategoriesService) => {
    const categories = new CategoryMockData();
    // well this looks silly!
    expect(service.getCurrentDepth()).toEqual(0);
    service.init(categories.categories.categories);
    expect(service.getCategories(0).length).toEqual(categories.categories.categories.length);
    expect(service.getCategories(0)[0].name).toEqual(categories.categories.categories[0].name);
    service.getCategories(0).forEach(element => {
      // Shallow copy so not exactly the same as we drop subCategories.
      expect(categories.categories.categories.find(x => x.id === element.id).name).toEqual(element.name);
    });
  }));

  it('should set filter on initial categories - with 1 level of nested clearance', inject([FilteredOrthogonalNestedCategoriesService],
    (service: FilteredOrthogonalNestedCategoriesService) => {
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

    expect(service.getCategories(1).findIndex(x => x.id === 38)).toEqual(-1);
    expect(service.getCategories(1).findIndex(x => x.id === 54)).toEqual(0);

    service.applyFilters([4], 0);
    expect(service.getCategories(0).length).toBe(0);
  }));
  it('does not clear parents on filter', inject([FilteredOrthogonalNestedCategoriesService],
    (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);
      expect(service.getCategories(0).findIndex(x => x.id === 4)).toEqual(3);
      expect(service.getCategories(2).findIndex(x => x.id === 55)).toEqual(0);

      service.applyFilters([38, 54, 46], 1);
      expect(service.getCategories(0).length).toBe(8);
      expect(service.getCategories(1).length).toBe(3);
      expect(service.getCategories(2).length).toBe(0);

      expect(service.getCategories(0).findIndex(x => x.id === 1)).toEqual(0);
      expect(service.getCategories(1).findIndex(x => x.id === 38)).not.toEqual(-1);
      expect(service.getCategories(2).findIndex(x => x.id === 55)).toEqual(-1);

      expect(service.getCategories(1).findIndex(x => x.id === 39)).toEqual(-1);

      service.applyFilters([4], 0);
      expect(service.getCategories(0).length).toBe(1);
    }));
  it('should toggle an empty set for greater depth than current model',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);
      expect(service.getCategories(0).length).toEqual(8);
      expect(service.toggle(1, 1).length).toBe(0);
      expect(service.toggle(1, 3).length).toBe(0);
    }));

  it('find any catagory at depth',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);

      expect(service.findCategoryAtDepth(47, 1)).not.toBeNull();
      // expect(service.findCategoryAtDepth(1, 47).name).toEqual('Toys');
      expect(service.toggle(1, 1).length).toBe(0);
      expect(service.toggle(1, 0).length).toBe(4);

      expect(service.findCategoryAtDepth(47, 1)).not.toBeNull();
      expect(service.findCategoryAtDepth(55, 2)).not.toBeNull();
    }));

  it('return full model',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);

      const data = service.getFullModel();
      expect(data.length).toEqual(4);
      expect(data[0].length).toEqual(8);
      expect(data[1].length).toEqual(46);
      expect(data[2].length).toEqual(1);
    }));
  it('can insert a category',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);

      expect(service.getCategories(1).length).toBe(46);
      const newCategory = new Category(99, 1, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(47);

      const newCategory2 = new Category(100, 0, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(0, newCategory2);
      expect(service.getCategories(0).length).toBe(9);

      const newCategory3 = new Category(101, 99, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(2, newCategory3);
      expect(service.getCategories(2).length).toBe(2);
    }));

  it('will only insert a flat category',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);
      expect(service.getCategories(1).length).toBe(46);
      const newCategory3 = new Category(101, 99, 'test', 'test', 'slug', 'imageUr', []);
      const newCategory = new Category(99, 1, 'test', 'test', 'slug', 'imageUr', [newCategory3]);
      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(46);

      const newCategory2 = new Category(100, 0, 'test', 'test', 'slug', 'imageUr', [newCategory]);
      service.insertCategory(0, newCategory2);
      expect(service.getCategories(0).length).toBe(8);
  }));
  it('cannot insert a duplicate category ID',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);

      expect(service.getCategories(1).length).toBe(46);
      const newCategory = new Category(99, 1, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(47);

      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(47);
    }));
  it('cannot insert category with invalid Parent',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);

      expect(service.getCategories(1).length).toBe(46);
      const newCategory = new Category(134, 1, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(0, newCategory);
      expect(service.getCategories(1).length).toBe(46);

      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(47);
    }));
    // This spec could be to raise orphans, delete or merge to another. Leave for now
    // Does allow implicit deletion through toggle option
  it('can delete a category and leaves orphans but allows implicit deletion through toggle',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      expect(service.getCurrentDepth()).toEqual(0);
      service.init(categories.categories.categories);

      expect(service.getCategories(1).length).toBe(46);
      const newCategory = new Category(99, 1, 'test', 'test', 'slug', 'imageUr', []);
      service.insertCategory(1, newCategory);
      expect(service.getCategories(1).length).toBe(47);

      service.deleteCategory(99, 1);
      expect(service.getCategories(1).length).toBe(46);

      service.deleteCategory(1, 0);
      expect(service.getCategories(0).length).toBe(7);
      expect(service.getCategories(1).length).toBe(46);
      expect(service.toggle(1, 0).length).toEqual(0);
    }));

  it('cannot delete an unknown category',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      service.init(categories.categories.categories);

      expect(service.getCategories(1).length).toBe(46);

      service.deleteCategory(99, 1);
      expect(service.getCategories(1).length).toBe(46);

      service.deleteCategory(1, 1);
      expect(service.getCategories(1).length).toBe(46);

      service.deleteCategory(1, 0);
      expect(service.getCategories(0).length).toBe(7);
    }));

  it('supports recursive find all children for parent - does not include parent',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      service.init(categories.categories.categories);

      expect(service.getCategories(1).length).toBe(46);
      expect(service.recursiveFindChildren([service.findCategoryAtDepth(2, 0)]).length).toEqual(7);

      expect(service.recursiveFindChildren([service.findCategoryAtDepth(1, 0)]).length).toEqual(4);

      expect(service.recursiveFindChildren([service.findCategoryAtDepth(47, 1)]).length).toEqual(1);
      expect(service.recursiveFindChildren([service.findCategoryAtDepth(48, 1)]).length).toEqual(0);
    }));

  it('supports recursive find all descendents to child - includes leaf',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      service.init(categories.categories.categories);

      expect(service.getCategories(2).length).toBe(1);
      expect(service.recursiveFindParents(55).length).toEqual(3);

      expect(service.recursiveFindParents(47).length).toEqual(2);
    }));

  it('supports recursive find',
    inject([FilteredOrthogonalNestedCategoriesService], (service: FilteredOrthogonalNestedCategoriesService) => {
      const categories = new CategoryMockData();
      // well this looks silly!
      service.init(categories.categories.categories);

      expect(service.findCategoryAtDepth(1).id).toBe(1);
      expect(service.findCategoryAtDepth(55).id).toBe(55);
      expect(service.findCategoryAtDepth(47).id).toBe(47);
    }));
});
