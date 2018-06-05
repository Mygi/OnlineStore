import { Observable } from 'rxjs';

export interface ListHandler<T> {
    addToList(newItem: T): void;
    deleteFromList(itemId: number): boolean;
    getAllFromList(): T[];
    initList(listItems: T[]): void;
    hasItem(itemId: number): boolean;
    getItem(itemId: number): T;
}

export interface SyncedListHandler<T> extends ListHandler<T> {
    saveList(): Observable<T[]>;
}
