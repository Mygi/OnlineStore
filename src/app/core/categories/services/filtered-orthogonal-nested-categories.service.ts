import { Injectable } from '@angular/core';
import { Category } from '../models/categories.model';
import { AbstractNestedCategory } from './nested-category.abstract';

@Injectable()
export class FilteredOrthogonalNestedCategoriesService extends AbstractNestedCategory {

  private categoryModel: Category[][] = [];
  private depth = 0;
  /**
   * Used only for filters
   *
   * @private
   * @type {Category[]}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  private results: Category[] = [];
  constructor() {
    super();
  }

  public init(categories: Category[]): void {
    this.categoryModel = [];
    this.flattenAndSplit(categories, 0, this.categoryModel);
    if (this.categoryModel.length > 0 ) {
      this.depth = 1;
    }
  }

/**
 * A recursive function to translate a tree into
 * a multi-dimensional array. NB: A shallow copy
 * of objects is used with {... notation
 * @private
 * @param {Category[]} category
 * @param {number} depth
 * @returns
 * @memberof FilteredOrthogonalNestedCategoriesService
 */
  private flattenAndSplit(category: Category[], depth: number, categoryModel: Category[][] ) {
    if (!this.hasDepth(depth, true) ) {
      categoryModel[depth] = [];
    }
    category.forEach( element => {
      const shallowCopyCat = {...element};
      shallowCopyCat.subCategories = [];
      categoryModel[depth].push(shallowCopyCat);
      this.flattenAndSplit(element.subCategories, depth + 1, categoryModel);
    });
    return;
  }

  /**
   * Painful recursive function as global scope
   * is needed for results -probably better as a subset function.
   * @param {Category[]} parents
   * @param {number} [depth]
   * @returns {Category[]}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  public recursiveFindChildren(parents: Category[], depth?: number): Category[] {
    if ( depth === undefined) {
      depth = 0;
      this.results = [];
    }
    while (depth < this.categoryModel.length) {
      const children = this.categoryModel[depth].filter(cat => parents.some(p => p.id === cat.parentCategoryId) );
      depth++;
      if ( children.length > 0 ) {
        this.results = this.results.concat(children);
      }
      this.recursiveFindChildren(children, depth );
    }
    return this.results;
  }

  /**
   * Finds all parent categories for any given child
   * Non depth dependant - but can use to optimise
   * @param {number} childId
   * @param {number} [depth]
   * @returns {Category[]}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  public recursiveFindParents(childId: number, depth?: number): Category[] {
    if (depth === undefined) {
      depth = this.categoryModel.length;
      this.results = [];
    }
    while ( depth >= 0 ) {
      let current: Category = null;
      if ( this.hasDepth(depth, false) ) {
        current = this.categoryModel[depth].find( x => x.id === childId);
      }
      depth --;
      if ( current ) {
        // console.log(current);
        this.results = this.results.concat(current);
        this.recursiveFindParents(current.parentCategoryId, depth);
      }
    }
    return this.results;
  }
  /**
   * @inheritDoc
   *
   * @returns {number}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  public getCurrentDepth(): number {
    return this.depth;
  }

  /**
   * @inheritDoc
   *
   * @returns {Category[][]}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  public getFullModel(): Category[][] {
    return this.categoryModel;
  }

  public getModelSize(): number {
    return this.categoryModel.length;
  }
  /**
   * @inheritDoc
   *
   * @param {number} depth
   * @returns {Category[]}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  public getCategories(depth: number): Category[] {
    return this.hasDepth(depth, false) ? this.categoryModel[depth] : null;
  }

  /**
   * Note this is a permanent filter - we actually don't allow a way
   * back to the original model by design
   *
   * In theory this should be all levels and this is recursive but it only matters
   * if you can pass through the toggle process and use the model directly
   * But the get full Model is expected be built on top of a pipe filter anyway
   * So the nesting shouldn't matter if implemented correctly
   *
   * BUT - should we remove unused parents - if you filter via a child?
   * That is a weird filter to set. Should we limit this to filters at root only?
   *
   * @param {number[]} filteredIds
   * @param {number} depth
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  public applyFilters(filteredIds: number[], depth: number): void {
    if (this.hasDepth(depth, false)) {
      const filteredArray: Category[] = this.categoryModel[depth].filter( x => filteredIds.some(a => a === x.id));
      this.categoryModel[depth] = filteredArray;
    }
    // let's apply all nesting filters
    if (this.hasDepth(depth, true)) {
      const filteredChildArray: Category[] = this.categoryModel[depth + 1].filter(x => filteredIds.some(a => a === x.parentCategoryId));
      this.categoryModel[depth + 1] = filteredChildArray;
      // console.log(filteredChildArray);
    }
    // This may create orphans - consider a remove orphans filter
  }

  /**
 * Note this is a permanent filter - we actually don't allow a way
 * back to the original model by design
 *
 * In theory this should be all levels and this is recursive but it only matters
 * if you can pass through the toggle process and use the model directly
 * But the get full Model is expected be built on top of a pipe filter anyway
 * So the nesting shouldn't matter if implemented correctly
 *
 * BUT - should we remove unused parents - if you filter via a child?
 * That is a weird filter to set. Should we limit this to filters at root only?
 *
 * @param {number[]} filteredIds
 * @param {number} depth
 * @memberof FilteredOrthogonalNestedCategoriesService
 */
  public filterAtDepth(filteredIds: number[], depth: number): Category[] {
    if (filteredIds.length === 0) {
      return this.categoryModel[depth];
    }
    if (this.hasDepth(depth, false)) {
      const results = this.categoryModel[depth].filter(x => filteredIds.some(a => a === x.id));
      return this.categoryModel[depth].filter(x => filteredIds.some(a => a === x.parentCategoryId));
    }
    return [];
    // This may create orphans - consider a remove orphans filter
  }
  /**
   * @inheritDoc
   *
   * @param {number} categoryId
   * @param {number} [depth]
   * @returns {Category}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  public findCategoryAtDepth(categoryId: number, depth?: number): Category {
    if (depth === undefined ) {
      depth = 0;
    }
    while (depth < this.categoryModel.length) {
      if (this.hasDepth(depth, false)) {
        const result = this.categoryModel[depth].find(x => x.id === categoryId);
        if ( result !== undefined ) {
          return result;
        }
      }
      depth++;
      return this.findCategoryAtDepth(categoryId, depth);
    }
    return null;
  }

  /**
   * @inheritDoc
   * NB: Will remove orphans on return
   * @param {number} selectedId
   * @param {number} [depth]
   * @returns {Category[]}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  public toggle(selectedId: number, depth?: number): Category[] {
    if (this.hasDepth(depth, true)) {
      this.depth = depth + 1;
        return this.categoryModel[this.depth].filter(x => {
         return ( (this.hasValidParent(this.depth, x.parentCategoryId, selectedId)) &&
          (x.parentCategoryId === selectedId) );
      });
    }
    return [];
  }
  /**
   * Checks if the array has been created at chosen depth
   * Can also check if child exists
   * @private
   * @param {number} depth
   * @param {boolean} andChildDepth
   * @returns {boolean}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  private hasDepth(depth: number, andChildDepth: boolean): boolean {
    if ( this.categoryModel[depth] === undefined) {
      return false;
    }
    return andChildDepth ? this.categoryModel.length > depth + 1 : this.categoryModel.length >= depth;
  }

  /**
   * Old method which strictly searches depth only
   *
   * @private
   * @param {number} categoryId
   * @param {number} depth
   * @returns {boolean}
   * @memberof FilteredOrthogonalNestedCategoriesService
   */
  private categoryExists(categoryId: number, depth: number ): boolean {
    if (this.hasDepth(depth, false ) ) {
      return (this.categoryModel[depth].findIndex( x => x.id === categoryId) !== -1 );
    }
    return false;
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
      return this.categoryModel.length;
    }
    if (this.hasDepth( depth, false) ) {
      if ( (!this.findCategoryAtDepth(category.id) ) &&
          (this.hasValidParent(depth, category.parentCategoryId, category.id)) ) {
          this.categoryModel[depth].push(category);
        }
    }
    return this.categoryModel.length;
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
    if (this.hasDepth(depth, false)) {
      const index = this.categoryModel[depth].findIndex(x => x.id === categoryId);
      if (index !== -1) {
        this.categoryModel[depth].splice(index, 1);
      }
    }
    return this.categoryModel.length;
  }

  private hasValidParent(childDepth: number, parentId: number, childId: number): boolean {
    if (childDepth < 0 ) {
      return false;
    }
    if ( (childDepth === 0 ) && (parentId === 0) ) {
      return true;
    }
    return ((this.categoryExists(parentId, childDepth - 1)) && (childId !== 0) );
  }
}
