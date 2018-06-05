import { Category } from '../models/categories.model';

export abstract class AbstractNestedCategory {

    /**
   * Not sure what this should do yet - other than load up initial
   * But maybe a model should be stored.. Or use local storage if
   * nesting needs to be achieved.
   * This should be cached!!!
   * @param {Category[]} categories
   * @memberof AbstractNestedCategory
   */
    public abstract init(categories: Category[]): void;

    /**
     * Get the state of the category selection
     *
     * @abstract
     * @returns {number}
     * @memberof AbstractNestedCategory
     */
    public abstract getCurrentDepth(): number;

    /**** Category Methods */
    /**
     * In this case [i] is the depth
     * [i][j] will get a category at depth
     * @abstract
     * @returns {Category[][]}
     * @memberof AbstractNestedCategory
     */
    public abstract getFullModel(): Category[][];

    /**
     * Get the categories for a specific depth
     * Could be subscribed to I think.
     * @param {number} depth
     * @memberof AbstractNestedCategory
     */
    public abstract getCategories(depth: number): Category[];

    /**
     * Filter a box for specific catagory IDS - mainly for parent cases
     * but may be handy elsewhere
     * @param {number[]} filteredIds
     * @param {number} boxIndex
     * @memberof AbstractNestedCategory
     */
    public abstract applyFilters(filteredIds: number[], depth: number): void;

    /**
    * Find a category in a selected depth with a selected id
    * If depth is not selected - perform a recursive search
    * @private
    * @param {number} categoryId
    * @param {number} depth
    * @returns {Category}
    * @memberof AbstractNestedCategory
    */
    public abstract findCategoryAtDepth(categoryId: number, depth?: number): Category;

    /**
     * Toggle any box level.
     * If no depth chosen toggle based on deep search
     * @param {number} selectedId
     * @param {number} selectedBoxIndex
     * @memberof AbstractNestedCategory
     */
    public abstract toggle(selectedId: number, depth?: number): Category[];

    /**
     * Insert a new category
     * Local model only (no http)
     * @abstract
     * @param {number} depth
     * @param {Category} category
     * @returns {number} The new count of items at this depth
     * @memberof AbstractNestedCategory
     */
    public abstract insertCategory(depth: number, category: Category): number;

    /**
     * Local model only
     * Delete from existng Categories
     * @abstract
     * @param {number} categoryId the category to delete
     * @param {number} [depth] The level of nesting
     * @returns {number} the new count of items for this depth
     * @memberof AbstractNestedCategory
     */
    public abstract deleteCategory(categoryId: number, depth?: number): number;
}
