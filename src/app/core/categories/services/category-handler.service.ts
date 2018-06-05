import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';
import { FilteredOrthogonalNestedCategoriesService } from './filtered-orthogonal-nested-categories.service';
import { CategorySelecterService } from './category-selecter.service';
import { Category, CategoryAlias } from '../models/categories.model';
import { CategoryContract, CategoryHandler } from '../../../global/contracts/modules/category.contract';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class CategoryHandlerService extends CategoryHandler  {

  private _categoryState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
     * Filters dictionary
     *
     * @private
     * @type {{ [id: number]: { selected: number[] }}}
     * @memberof CategorySelecterComponent
     */
  private filters: { [id: number]: { selected: number[] } } = {};

  /**
   * maybe time to use _depth for private
   *
   * @private
   * @memberof CategorySelecterComponent
   */
  private _depth = 0;

  /**
   * Creates an instance of CategorySelecterComponent.
   * @param {CategoryService} service
   * @param {FilteredOrthogonalNestedCategoriesService} nestedHandler
   * @param {CategorySelecterService} categoryHandler
   * @memberof CategorySelecterComponent
   */
  constructor(private service: CategoryService, private nestedHandler: FilteredOrthogonalNestedCategoriesService,
    private categorySelecterService: CategorySelecterService) {
    super();
    this.filters[0] = {
      selected: []
    };
    this.getHttpCategories();
  }
  public initList(selecedCategories: CategoryContract[] ) {
    this.categorySelecterService.initSelectedCategories(selecedCategories as CategoryAlias[]);
  }
  public hasItem(itemId: number): boolean {
    return this.categorySelecterService.hasSelectedCategory( itemId );
  }

  public getItem(itemId: number): CategoryContract {
    return this.categorySelecterService.getSelectedCategory(itemId);
  }

  public deleteFromList(itemId: number): boolean {
    return this.categorySelecterService.removeSelectedCategory(itemId);
  }
  public resetCategories(): void {
    this._categoryState.next(false);
    this.filters[0] = {
      selected: []
    };
    this.getHttpCategories();
  }

  public getCategoryState(): BehaviorSubject<boolean> {
    return this._categoryState;
  }
  /**
   * Initialise catagories
   *
   * @memberof CategorySelecterComponent
   */
  getHttpCategories() {
    this.service.getCategories().subscribe(
      data => {
        // console.log(data);
        this.nestedHandler.init(data);
        // console.log(this.nestedHandler.getFullModel());
        this._categoryState.next(true);
      }
    );
  }

  /**
   * Gets Parent Id for child list
   *
   * @param {number} index
   * @returns {number}
   * @memberof CategorySelecterComponent
   */
  public getParentId(index: number): number {
    return this.filters[index].selected[0];
  }

  /**
   * Get the list of filtered catagories for current depth
   * Does not use the hidden option and permits inital filtering
   * @param {number} depth
   * @returns {Category[]}
   * @memberof CategorySelecterComponent
   */
  public getCategories(depth: number): Category[] {
    return this.nestedHandler.filterAtDepth(this.filters[depth].selected, depth);
  }

  /**
   * Return result is sort of irrelevant
   * And Filters should probably be moved back to service
   * Although a pipe could do this as well
   *
   * @param {{ depth: number, category: Category }} toggleData
   * @memberof CategorySelecterComponent
   */
  public onToggled(toggleData: { depth: number, category: Category }): void {
    if (this.filters[toggleData.depth + 1] === undefined) {
      this.filters[toggleData.depth + 1] = {
        selected: []
      };
    }
    this._depth = toggleData.depth + 1;
    this.filters[toggleData.depth + 1].selected = [toggleData.category.id];
    for (const key in this.filters) {
      if (+key > this._depth) {
        this.filters[key].selected = [];
      }
    }
  }

  /**
   * This gets toggled levels
   *
   * @returns {number}
   * @memberof CategorySelecterComponent
   */
  public getLevels(depth?: number): number[] {
    if (depth !== undefined) {
      return Array(depth).fill(1).map((x, i) => i);
    }
    const numbers = Array(this.nestedHandler.getModelSize()).fill(1).map((x, i) => i);
    return numbers;
  }

  /**
   * Check if the selected level exists in the model
   * yet.
   * @param {number} index
   * @returns {boolean}
   * @memberof CategorySelecterComponent
   */
  public hasLevel(index: number): boolean {
    return ((this.filters[index] !== undefined) && (this._depth >= index));
  }

  /**
   * Adds a category to the selected items
   * Emit this instead
   * @param {{ depth: number, category: Category}} eventData
   * @memberof CategorySelecterComponent
   */
  public addCategory(eventData: { depth: number, category: Category }) {
    const parents = this.nestedHandler.recursiveFindParents(eventData.category.id);
    parents.forEach(cat =>
      this.categorySelecterService.addSelectedCategory(new CategoryAlias(cat.id, cat.name, cat.parentCategoryId, eventData.depth)));
  }
  /**
     * Remove catagory and any child catagories linked
     *
     * @param {CategoryAlias} removedAlias
     * @param {number} [depth]
     * @memberof CategorySelecterComponent
     */
  public removeCategory(removedAlias: CategoryAlias, depth?: number): void {
    const tagDeleted = this.nestedHandler.findCategoryAtDepth(removedAlias.id);
    // what is this ID?
    if (tagDeleted) {
      const children = this.nestedHandler.recursiveFindChildren([tagDeleted]);
      // console.log('children', children);
      this.categorySelecterService.removeSelectedCategory(removedAlias.id);
      children.forEach(cat => this.categorySelecterService.removeSelectedCategory(cat.id));
    }
  }
  /**
   * Gets all added categories to a list
   *
   * @returns {CategoryAlias[]}
   * @memberof CategorySelecterComponent
   */
  public getAllFromList(): CategoryAlias[] {
    return this.categorySelecterService.getSelectedCatageories();
  }
  public addToList(newCtagory: CategoryContract): void {
    this.categorySelecterService.addSelectedCategory(newCtagory as CategoryAlias);
  }
  public applyFilters(filteredIds: number[], boxIndex: number) {
    // console.log('call me' + filteredIds);
    this.nestedHandler.applyFilters(filteredIds, boxIndex);
  }
}

// A little stuck here - or just out of energy
