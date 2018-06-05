import { RestfulService, ConcreteRestfulService } from '../services/restful-service.abstract';
import { ListHandler } from '../services/list-handler.interface';
import { TypeContract } from './tag.contract';
import { BehaviorSubject } from 'rxjs';

export interface CategoryContract extends TypeContract {
    parentCategoryId: number;
    subCategories?: CategoryContract[];
    depth?: number;
    name: string;
    id: number;
}

export abstract class CategoryHandler implements ListHandler<CategoryContract> {
    public abstract hasItem(itemId: number): boolean;

    public abstract getItem(itemId: number): CategoryContract;

    public abstract initList(listItems: CategoryContract[]): void;

    public abstract addToList(newCtagory: CategoryContract): void;

    public abstract deleteFromList(itemId: number): boolean;

    public abstract getAllFromList(): CategoryContract[];

    public abstract removeCategory(cat: CategoryContract, depth?: number):  void;

    public abstract applyFilters(filteredIds: number[], boxIndex: number): void;

    public abstract resetCategories(): void;

    public abstract getCategoryState(): BehaviorSubject<boolean>;

    public abstract getLevels(depth?: number): number[];
}

export abstract class CategoryProvider extends ConcreteRestfulService<CategoryContract> {

}
