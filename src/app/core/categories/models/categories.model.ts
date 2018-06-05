// 3rd party decorator
import { JsonObject, JsonProperty, JsonConverter, JsonCustomConvert } from 'json2typescript';
import { CategoryContract } from '../../../global/contracts/modules/category.contract';
export class CategoryAlias implements CategoryContract {

    // Optional in alias model
    subCategories: CategoryContract[] = [];

    @JsonProperty('id')
    public id: number;

    @JsonProperty('name', String)
    public name: string;

    @JsonProperty('parentCategoryId')
    public parentCategoryId: number;

    @JsonProperty('depth')
    public depth?: number;

    constructor(id: number, name: string, parentCategoryId: number, depth?: number) {
        this.id = id;
        this.name = name;
        this.parentCategoryId = parentCategoryId;
        this.depth = depth;
    }
}
export interface CategoryInterface {
    getId(): number;
    getParentCategoryId(): number;
    getName(): string;
    getDescription(): string;
    getSlug(): string;
    getImageUrl(): string;
    getSubCategories(): CategoryContract[];

    setId(id: number): void;
    setParentCategoryId(id: number): void;
    setName(name: string): void;
    setDescription(description: string): void;
    setSlug(slug: string): void;
    setImageUrl(imageUrl: string): void;
    setSubCategories(children: CategoryContract[]): void;
}


export class Category extends CategoryAlias {

    public id: number;
    public parentCategoryId: number;
    public name: string;
    public description: string;
    public slug: string;
    public imageUrl: string;
    public subCategories: Category[];
    constructor(id: number,
        parentCategoryId: number,
        name: string,
        description: string,
        slug: string,
        imageUrl: string,
        subCategories: Category[]) {
            super(id, name, parentCategoryId);
            this.id                 = id;
            this.parentCategoryId   = parentCategoryId;
            this.name               = name;
            this.description        = description;
            this.slug               = slug;
            this.imageUrl           = imageUrl;
            this.subCategories      = subCategories;
    }
    // getId(): number {
    //     return this.id;
    // }
    // getParentCategoryId(): number {
    //     return this.parentCategoryId;
    // }
    // getName(): string {
    //     return this.name;
    // }
    // getDescription(): string {
    //     return this.description;
    // }
    // getSlug(): string {
    //     return this.slug;
    // }
    // getImageUrl(): string {
    //     return this.imageUrl;
    // }
    // getSubCategories(): CategoryContract[] {
    //     return this.subCategories;
    // }
    // setId(id: number): void {
    //     this.id = id;
    // }
    // setParentCategoryId(id: number): void {
    //     this.parentCategoryId = id;
    // }
    // setName(name: string): void {
    //     this.name = name;
    // }
    // setDescription(description: string): void {
    //     this.description = description;
    // }
    // setSlug(slug: string): void {
    //     this.slug = slug;
    // }
    // setImageUrl(imageUrl: string): void {
    //     this.imageUrl = imageUrl;
    // }
    // setSubCategories(children: CategoryContract[]): void {
    //     this.subCategories = children;
    // }
}


/**
 * Not to be used as a service
 *
 * @export
 * @class SelectableCategory
 */
export class SelectableCategory {
    public category: Category;
    public selected: boolean;
}
@JsonObject
export class CategoryServiceModel {
    @JsonProperty('categoryID')
    categoryID: number;

    @JsonProperty('description')
    description?: string;

    @JsonProperty('imageURL')
    imageURL?: string;

    @JsonProperty('isActive')
    isActive: boolean;

    @JsonProperty('isPublic')
    isPublic: boolean;

    @JsonProperty('level')
    level: number;

    @JsonProperty('name')
    name: string;

    @JsonProperty('parentCat')
    parentCat?: number;

    @JsonProperty('slug')
    slug: string;

    @JsonProperty('sort')
    sort: number;
}
export class CategoryServiceData {
    data: CategoryServiceModel[];
}
