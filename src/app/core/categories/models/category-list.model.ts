import { Category } from './categories.model';
import { Pagination } from './pagination.model';

export class CategoryList {
    public categories: Category[];
    public pagination: Pagination;
    /**
     *
     */
    constructor(categories: Category[],
                pagination: Pagination) {
        this.categories = categories;
        this.pagination = pagination;
    }
}
