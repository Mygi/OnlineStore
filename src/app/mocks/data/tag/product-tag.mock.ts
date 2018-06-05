import { Tag } from '../../../core/tags/models/tag.model';

export class ProductTag {
    tags: Tag[] = [
                {
                    tagGroupID: 1,
                    count: 1,
                    slug: 'Product',
                    name: 'panama',
                    suggest: '0',
                    id: 1,
                    foreignId: 1,
                    foreignType: 'products'
                },
        {
            tagGroupID: 1,
            count: 1,
            slug: 'Product',
            name: 'bowler',
                    suggest: '0',
            id: 2,
            foreignId: 1,
            foreignType: 'products'
        },
        {
            tagGroupID: 1,
            count: 1,
            slug: 'Product',
            name: 'top hat',
                    suggest: '0',
            id: 3,
            foreignId: 1,
            foreignType: 'products'
        },
        {
            tagGroupID: 1,
            count: 1,
            slug: 'Product',
            name: 'cap',
                    suggest: '0',
            id: 4,
            foreignId: 1,
            foreignType: 'products'
        },
        {
            tagGroupID: 1,
            count: 1,
            slug: 'Product',
            name: 'pork pie',
                    suggest: '0',
            id: 5,
            foreignId: 1,
            foreignType: 'products'
        }
    ];
}
