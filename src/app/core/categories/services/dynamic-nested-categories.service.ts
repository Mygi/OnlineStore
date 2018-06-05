import { Injectable } from '@angular/core';
import { Category } from '../models/categories.model';
import { AbstractNestedCategory } from './nested-category.abstract';

@Injectable()
export class DynamicNestedCategoriesService implements AbstractNestedCategory {

  /**
   * The model for storing the current state of category selecters
   * Where Children exist a new index will need to be added
   * @type {{ [id: number]: {Category, number} }}
   * @memberof CategorySelecterService
   */
  private currentCategoryDictionary: { [id: number]: { categories: Category[], selected: number } } = {};

  // The empty state
  private currentCategoryDepth = 0;

  constructor() { }
  /**
   * Get the depth value - readonly fron outside this class
   *
   * @returns
   * @memberof CategorySelecterService
   */
  public getCurrentDepth() {
    return this.currentCategoryDepth;
  }

  /**
   * Get the categories for a specific depth
   * Could be subscribed to I think.
   * @param {number} depth
   * @memberof CategorySelecterService
   */
  public getCategories(depth: number): Category[] {
    if (this.currentCategoryDictionary[depth] !== undefined) {
      return this.currentCategoryDictionary[depth].categories;
    }
    return [];
  }

  /**
   * Not sure what this should do yet - other than load up initial
   * But maybe a model should be stored.. Or use local storage if
   * nesting needs to be achieved.
   * This should be cached!!!
   * @param {Category[]} categories
   * @memberof CategorySelecterService
   */
  public init(categories: Category[]) {
    this.currentCategoryDictionary[this.currentCategoryDepth] = {
      categories: categories,
      selected: 0
    };
    this.currentCategoryDepth++;
    this.currentCategoryDictionary[this.currentCategoryDepth] = {
      categories: [],
      selected: 0
    };
  }

  /**
   * @inheritDoc
   *
   */
  public  getFullModel(): Category[][] {
    const model: Category[][] = [];
    Object.keys(this.currentCategoryDictionary).forEach(key => {
      model[key] = this.currentCategoryDictionary[key].categories;
    });
    return model;
  }

  /**
   * Filter a box for specific catagory IDS - mainly for parent cases
   * but may be handy elsewhere
   * @param {number[]} filteredIds
   * @param {number} boxIndex
   * @memberof CategorySelecterService
   */
  public applyFilters(filteredIds: number[], boxIndex: number) {
    if (this.currentCategoryDictionary[boxIndex] !== undefined) {
      const filtered = this.currentCategoryDictionary[boxIndex].categories.filter(x => filteredIds.some(a => a === x.id));
      this.currentCategoryDictionary[boxIndex].categories = filtered;
    }
  }

  /**
   * Find a category in a selected box with a selected id
   *
   * @private
   * @param {number} categoryId
   * @param {number} depth
   * @returns {Category}
   * @memberof CategorySelecterService
   */
  public findCategoryAtDepth(categoryId: number, depth?: number): Category {
    if (this.currentCategoryDictionary[depth] !== undefined) {
      return this.currentCategoryDictionary[depth].categories.find(x => x.id === categoryId);
    }
    return null;
  }

  /**
   * Toggle any box level.
   *
   * @param {number} selectedId
   * @param {number} selectedBoxIndex
   * @memberof CategorySelecterService
   */
  toggle(selectedId: number, depth?: number): Category[] {
    const category = this.currentCategoryDictionary[depth].categories.find(x => x.id === selectedId);
    if (category) {
      // remove child categories/ selected Items
      if (depth < this.currentCategoryDepth) {
        for (let index = this.currentCategoryDepth; index > depth; index--) {
          this.currentCategoryDictionary[depth].selected = 0;
          this.currentCategoryDictionary[index].categories = [];
        }
      }
      // change depth - we don't necessarily need to splice the dictionary yet. But it may become handy
      this.currentCategoryDepth = depth + 1;
      // set selected ID
      this.currentCategoryDictionary[depth].selected = selectedId;
      // set sub categories
      if (this.currentCategoryDictionary[this.currentCategoryDepth] === undefined) {
        this.currentCategoryDictionary[this.currentCategoryDepth] = {
          categories: category.subCategories,
          selected: 0
        };
      } else {
        this.currentCategoryDictionary[this.currentCategoryDepth].categories = category.subCategories;
      }
      return category.subCategories;
    }
    return [];
  }

  /**
 * @inheritDoc
 *
 * @param {number} depth
 * @param {Category} category
 * @returns {number}
 * @memberof FilteredOrthogonalNestedCategoriesService
 */
  public insertCategory(depth: number, category: Category): number {
    if (category.subCategories.length > 0) {
      return this.currentCategoryDictionary[depth].categories.length;
    }
    if ( (!this.findCategoryAtDepth(category.id, depth) ) && (this.hasDepth(depth)) ) {
      if (this.hasValidParent(depth, category.parentCategoryId, category.id)) {
        this.currentCategoryDictionary[depth].categories.push(category);
      }

    }
    return this.currentCategoryDictionary[depth].categories.length;
  }

  /**
   * @inheritDoc
   *
   * @param {number} categoryId
   * @param {number} [depth]
   * @returns {number}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  public deleteCategory(categoryId: number, depth?: number): number {
    if ( (this.currentCategoryDictionary[depth] !== undefined) && (!this.findCategoryAtDepth(depth)) ) {
      const index = this.getCategoryIndex( categoryId, depth);
      if (index !== -1) {
        this.currentCategoryDictionary[depth].categories.splice(index, 1);
      }
    }
    return this.currentCategoryDictionary[depth].categories.length;
  }

  /**
   * Gets the category index for a selected item
   * and depth
   * @private
   * @param {number} categoryId
   * @param {number} depth
   * @returns {number}
   * @memberof DynamicNestedCategoriesService
   */
  private getCategoryIndex(categoryId: number, depth: number): number {
    return this.currentCategoryDictionary[depth].categories.findIndex( x => x.id === categoryId);
  }

  /**
   * Checks if the model has been created to the specified
   * depth
   *
   * @private
   * @param {number} depth
   * @returns {boolean}
   * @memberof DynamicNestedCategoriesService
   */
  private hasDepth(depth: number): boolean {
    return this.currentCategoryDictionary[depth] !== undefined;
  }

  private hasValidParent(childDepth: number, parentId: number, childId: number): boolean {
    if (childDepth < 0) {
      return false;
    }
    if ((childDepth === 0) && (parentId === 0)) {
      return true;
    }
    return ((this.findCategoryAtDepth(parentId, childDepth - 1)) && (childId !== 0));
  }
}

