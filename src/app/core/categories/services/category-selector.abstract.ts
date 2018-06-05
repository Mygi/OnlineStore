import { CategoryAlias, Category } from '../models/categories.model';
export abstract class AbstractCategorySelector {
    /**
     * Mainly enforcing type safety. If you can access
     * this and write to it - state won't be broken
     * as init allows for write but you could accidently
     * empty it.
     * @returns
     * @memberof AbstractCategorySelector
     */
    public abstract getSelectedCatageories(): CategoryAlias[];

    /**
     * Set the selected Catagories from a list
     *
     * @param {CategoryAlias[]} selectedCategories
     * @memberof AbstractCategorySelector
     */
    public abstract initSelectedCategories(selectedCategories: CategoryAlias[]): void;

    /**
     * Select catagory and all parent categories
     * And add them to selected list
     * @private
     * @param {number} categoryId
     * @memberof AbstractCategorySelector
     */
    public abstract addSelectedCategory(alias: CategoryAlias): boolean;

    /**
     * Shallow remove. Will not remove parent categories for child.
     * Could check for orphans - but it starts to seem unintuitve.
     * @param {number} categoryId
     * @memberof AbstractCategorySelector
     */
    public abstract removeSelectedCategory(categoryId: number): boolean;

    /**
     * Get a category from a selected list
     *
     * @param {number} categoryId
     * @returns {CategoryAlias}
     * @memberof AbstractCategorySelector
     */
    public abstract getSelectedCategory(categoryId: number): CategoryAlias;

    /**
     * Check if the category has already been selected
     *
     * @param {number} categoryId
     * @returns {boolean}
     * @memberof AbstractCategorySelector
     */
    public abstract hasSelectedCategory(categoryId: number): boolean;


}
