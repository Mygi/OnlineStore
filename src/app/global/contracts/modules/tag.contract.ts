import { RestfulService, ConcreteRestfulService } from '../services/restful-service.abstract';
import { ListHandler, SyncedListHandler } from '../services/list-handler.interface';
import { Observable } from 'rxjs';

// So the thing is - what does another module care about annotations?
// Thay are mainly sued for mapping on Request purposes.
// So adding them to the contract is weird
// But we may not have a choice - so suck it up? or use interfaces?
// But as shown before interfaces are limited
export interface TypeContract {
    id: number;
    name: string;
}

export interface TagContract extends TypeContract {
    foreignType: string;
    foreignId: number;
    slug: string;
    suggest: string;
    tagGroupID ?: number;
    count?: number;

}

/**
 * The contract expected of a Tag Handler
 *
 * @export
 * @abstract
 * @class TagHandlerService
 * @extends {RestfulService<TagContract>}
 * @implements {ListHandler<TagContract>}
 */
export abstract class TagHandlerService extends ConcreteRestfulService<TagContract> implements SyncedListHandler<TagContract> {
    public abstract hasItem(itemId: number): boolean;

    public abstract getItem(itemId: number): TagContract;

    public abstract saveList(): Observable<TagContract[]>;

    public abstract initList(listItems: TagContract[]): void;

    public abstract addToList(newCtagory: TagContract): void;

    public abstract deleteFromList(itemId: number): boolean;

    public abstract getAllFromList(): TagContract[];

    public abstract getTagsForType(type: string): Observable<TagContract[]>;


}
