import { TestBed, inject } from '@angular/core/testing';
// Mocks
import { CategoryMockData } from '../../../mocks/data/category/category-mock-data.data';

// Models
import { CategoryAlias, Category } from '../models/categories.model';
import { CategoryList } from '../models/category-list.model';

// services
import { CategorySelecterService } from './category-selecter.service';

// Config
import { APP_CONFIG, FKConfig } from '../../../app.config';

describe('CategorySelecterService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [CategorySelecterService]
    });
  });

  it('should be created', inject([CategorySelecterService], (service: CategorySelecterService) => {
    expect(service).toBeTruthy();
  }));

  it('should set and find Selected Categories', inject([CategorySelecterService], (service: CategorySelecterService) => {
    const categories = new CategoryMockData();
    // Should we check that the selected category exists in our model?
    // Even when filtered? There is an inherent decoupling here. Which may not be bad
    // Until you attempt to delete the wrong key.
    const selCategories: CategoryAlias[] = [{ name: 'A', id: 1, parentCategoryId: 0, subCategories: [] },
                                            { name: 'B', id: 2, parentCategoryId: 0, subCategories: [] }];
    service.initSelectedCategories(selCategories);
    expect(service.getSelectedCatageories().length).toBe(2);
    expect(service.getSelectedCatageories()[0].name).toBe('A');
    expect(service.getSelectedCatageories()[1].name).toBe('B');
    expect(service.hasSelectedCategory(1)).toBeTruthy();
    expect(service.hasSelectedCategory(3)).toBeFalsy();
    expect(service.getSelectedCategory(1)).toEqual(selCategories[0]);
    expect(service.getSelectedCategory(2)).toEqual(selCategories[1]);

}));
  it('should set add and remove categories', inject([CategorySelecterService], (service: CategorySelecterService) => {
    const categories = new CategoryMockData();
    // Should we check that the selected category exists in our model?
    // Even when filtered? There is an inherent decoupling here. Which may not be bad
    // Until you attempt to delete the wrong key.
    const selCategories: CategoryAlias[] = [{ name: 'A', id: 1, parentCategoryId: 0, subCategories: [] },
    { name: 'B', id: 2, parentCategoryId: 0, subCategories: [] }];
    service.initSelectedCategories(selCategories);
    expect(service.getSelectedCatageories().length).toBe(2);

    expect(service.addSelectedCategory(new CategoryAlias(4, 'blah', 0))).toBeTruthy();
    expect(service.getSelectedCatageories()[2].name).toBe('blah');
    expect(service.getSelectedCatageories().length).toBe(3);

    expect(service.removeSelectedCategory(1)).toBeTruthy();
    expect(service.getSelectedCatageories().length).toBe(2);
    expect(service.getSelectedCatageories()[0].name).toBe('B');
  }));

  it('should only add a category ID once', inject([CategorySelecterService], (service: CategorySelecterService) => {
    const selCategories: CategoryAlias[] = [{ name: 'A', id: 1, parentCategoryId: 0, subCategories: [] },
                                            { name: 'B', id: 2, parentCategoryId: 0, subCategories: [] }];
    service.initSelectedCategories(selCategories);
    expect(service.getSelectedCatageories().length).toBe(2);

    expect(service.addSelectedCategory(new CategoryAlias(1, 'blah', 0))).toBeFalsy();
    expect(service.getSelectedCatageories().length).toBe(2);
  }));

  it('should not remove and return false when a category ID is not found',
          inject([CategorySelecterService], (service: CategorySelecterService) => {
    const selCategories: CategoryAlias[] = [{ name: 'A', id: 1, parentCategoryId: 0, subCategories: [] },
                                            { name: 'B', id: 2, parentCategoryId: 0, subCategories: [] }];
    service.initSelectedCategories(selCategories);
    expect(service.getSelectedCatageories().length).toBe(2);

    expect(service.removeSelectedCategory(3)).toBeFalsy();
    expect(service.getSelectedCatageories().length).toBe(2);
  }));
});
