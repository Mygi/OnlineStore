import { Injectable } from '@angular/core';
import { CategoryAlias, Category } from '../models/categories.model';
import { AbstractCategorySelector } from './category-selector.abstract';
/**
 * This may need a dictionary to allow
 * multiple category selecters on the same DOM !Important
 * @export
 * @class CategorySelecterService
 */
@Injectable()
export class CategorySelecterService extends AbstractCategorySelector {

  private selectedCategories: CategoryAlias[] = [];

  constructor() {
    super();
  }

   /**
    * Mainly enforcing type safety. If you can access
    * this and write to it - state won't be broken
    * as init allows for write but you could accidently
    * empty it.
    * @returns
    * @memberof CategorySelecterService
    */
   public getSelectedCatageories() {
     return this.selectedCategories;
   }

  /**
   * Set the selected Catagories from a list
   *
   * @param {CategoryAlias[]} selectedCategories
   * @memberof CategorySelecterService
   */
  public initSelectedCategories(selectedCategories: CategoryAlias[]): void {
    this.selectedCategories = selectedCategories;
  }


  /**
   * Select catagory and all parent categories
   * And add them to selected list
   * @private
   * @param {number} categoryId
   * @memberof CategorySelecterService
   */
  public addSelectedCategory(alias: CategoryAlias): boolean {
    if (!this.hasSelectedCategory(alias.id)) {
      this.selectedCategories.push(alias);
      return true;
    }
    return false;
  }

  /**
   * Shallow remove. Will not remove parent categories for child.
   * Could check for orphans - but it starts to seem unintuitve.
   * @param {number} categoryId
   * @memberof CategorySelecterService
   */
  public removeSelectedCategory(categoryId: number): boolean {
    if (this.hasSelectedCategory(categoryId)) {
      const index = this.selectedCategories.findIndex(x => x.id === categoryId);
      this.selectedCategories.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get a category from a selected list
   *
   * @param {number} categoryId
   * @returns {CategoryAlias}
   * @memberof CategorySelecterService
   */
  public getSelectedCategory(categoryId: number): CategoryAlias {
    return this.selectedCategories.find(x => x.id === categoryId);
  }

  /**
   * Check if the category has already been selected
   *
   * @param {number} categoryId
   * @returns {boolean}
   * @memberof CategorySelecterService
   */
  public hasSelectedCategory(categoryId: number): boolean {
    return (this.selectedCategories.findIndex(x => x.id === categoryId) !== -1);
  }

}
