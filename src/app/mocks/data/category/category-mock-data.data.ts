import { CategoryList} from '../../../core/categories/models/category-list.model';

/*
          this.id                 = id;
            this.parentCategoryId   = parentCategoryId;
            this.name               = name;
            this.description        = description;
            this.slug               = slug;
            this.imageUrl           = imageUrl;
            this.subCategories      = subCategories;
            */

export class CategoryMockData {
    categories: CategoryList = {
        'categories': [
            {
                id: 1,
                parentCategoryId: null,
                name: 'Art & Illustration', // 'Art & Illustration',
                description: '',
                slug: 'art-illustration',
                imageUrl: 'http://www.thefinderskeepers.com/assets/images/_profiles/formebydee/thumba.jpg',
                subCategories: [
                    {
                        id: 54,
                        name: 'Prints',
                        slug: 'prints',
                        description: '',
                        parentCategoryId: 1,
                        subCategories: [],
                        imageUrl: ''
                    },
                    {
                        id: 53,
                        name: 'Framed Artworks',
                        slug: 'framed-artworks',
                        description: '',
                        parentCategoryId: 1,
                        subCategories: [],
                        imageUrl: ''
                    },
                    {
                        id: 52,
                        name: 'Wall Decor',
                        slug: 'wall-decor',
                        description: '',
                        parentCategoryId: 1,
                        subCategories: [],
                        imageUrl: ''
                    },
                    {
                        id: 51,
                        name: 'Photography',
                        slug: 'photography',
                        description: '',
                        parentCategoryId: 1,
                        subCategories: [], imageUrl: ''
                    }
                ]
            },
            {
                id: 2,
                parentCategoryId: null,
                name: 'Baby & Kids',
                description: '',
                slug: 'baby-kids',
                // tslint:disable-next-line:max-line-length
                imageUrl: 'https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/hLVdyA4uElAbFy9TOyNPVQQlrp79ErCfD2Lu47oX1509323338.jpeg',
                subCategories: [
                    {
                        id: 50,
                        name: 'Baby Clothing 0-3',
                        slug: 'baby-clothing-0-3',
                        description: '',
                        parentCategoryId: 2,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 49,
                        name: 'Kids Clothing 3+',
                        slug: 'kids-clothing-3-up',
                        description: '',
                        parentCategoryId: 2,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 48,
                        name: 'Kids Accessories',
                        slug: 'kids-accessories',
                        description: '',
                        parentCategoryId: 2,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 47,
                        name: 'Toys',
                        slug: 'toys',
                        description: '',
                        parentCategoryId: 2,
                        subCategories: [
                            {
                                id: 55,
                                name: 'Soft Toys',
                                slug: 'softToys',
                                description: '',
                                parentCategoryId: 47,
                                subCategories: [],
                                imageUrl: ''
                            }
                        ],
                        imageUrl: ''
                    },
                    {
                        id: 9,
                        name: 'Kids Art',
                        slug: 'kids-art',
                        description: '',
                        parentCategoryId: 2,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 10,
                        name: 'Party',
                        slug: 'party',
                        description: '',
                        parentCategoryId: 2,
                        subCategories: [], imageUrl: ''
                    }
                ]
            },
            {
                id: 3,
                parentCategoryId: null,
                name: 'Fashion',
                description: '',
                slug: 'fashion',
                // tslint:disable-next-line:max-line-length
                imageUrl: 'https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/q7p67ud0l37KDxN1t6259OETsv3nGgmnfiN04c2f1515187689.jpeg',
                subCategories: [
                    {
                        id: 11,
                        name: 'Clothing',
                        slug: 'clothing',
                        description: '',
                        parentCategoryId: 3,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 12,
                        name: 'Accessories',
                        slug: 'accessories',
                        description: '',
                        parentCategoryId: 3,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 13,
                        name: 'Bags & Wallets',
                        slug: 'bags-wallets',
                        description: '',
                        parentCategoryId: 3,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 14,
                        name: 'Shoes',
                        slug: 'shoes',
                        description: '',
                        parentCategoryId: 3,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 15,
                        name: 'Hats',
                        slug: 'hats',
                        description: '',
                        parentCategoryId: 3,
                        subCategories: [], imageUrl: ''
                    }
                ]
            },
            {
                id: 4,
                parentCategoryId: null,
                name: 'Jewellery',
                description: '',
                slug: 'jewellery',
                // tslint:disable-next-line:max-line-length
                imageUrl: 'https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/BPkRiDD5Ao7qvJmifvBW15gROBaYeNylSYzX1n0C1508828552.jpeg',
                subCategories: [
                    {
                        id: 16,
                        name: 'Earrings',
                        slug: 'earrings',
                        description: '',
                        parentCategoryId: 4,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 17,
                        name: 'Necklaces',
                        slug: 'necklaces',
                        description: '',
                        parentCategoryId: 4,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 18,
                        name: 'Bracelets',
                        slug: 'bracelets',
                        description: '',
                        parentCategoryId: 4,
                        subCategories: [], imageUrl: ''
                    },
                    {
                        id: 19,
                        name: 'Rings',
                        slug: 'rings',
                        description: '',
                        parentCategoryId: 4,
                        subCategories: [], imageUrl: ''
                    }
                ]
            },
            {
                id: 5,
                parentCategoryId: null,
                name: 'For Him',
                description: '',
                slug: 'for-him',
                // tslint:disable-next-line:max-line-length
                imageUrl: 'https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/DpxNywcE4pKFBFxtHDt2IZn0xLAFnu2Fpx6ZsxqL1507590929.jpeg',
                subCategories: [
                    {
                        id: 20,
                        name: 'Clothing',
                        slug: 'clothing',
                        description: '',
                        parentCategoryId: 5,
                        subCategories: [],
                        imageUrl: ''
                    },
                    {
                        id: 21,
                        name: 'Grooming',
                        slug: 'grooming',
                        description: '',
                        parentCategoryId: 5,
                        subCategories: [],
                        imageUrl: ''
                    },
                    {
                        id: 22,
                        name: 'Bags & Wallets',
                        slug: 'bags-wallets',
                        description: '',
                        parentCategoryId: 5,
                        subCategories: [],
                        imageUrl: ''
                    },
                    {
                        id: 23,
                        name: 'Accessories',
                        slug: 'accessories',
                        description: '',
                        parentCategoryId: 5,
                        subCategories: [],
                        imageUrl: ''
                    },
                    {
                        id: 24,
                        name: 'Hats & Caps',
                        slug: 'hats-caps',
                        description: '',
                        parentCategoryId: 5,
                        subCategories: [],
                        imageUrl: ''
                    },
                    {
                        id: 25,
                        name: 'Gadgets',
                        slug: 'gadgets',
                        description: '',
                        parentCategoryId: 5,
                        subCategories: [],
                        imageUrl: ''
                    },
                    {
                        id: 26,
                        name: 'Shoes',
                        description: '',
                        parentCategoryId: 5,
                        subCategories: [],
                        imageUrl: '',
                        slug: 'shoes'
                    }
                ]
            },
            {
                id: 6,
                parentCategoryId: null,
                name: 'Home & Living',
                description: '',
                slug: 'home-living',
                imageUrl: 'http://www.thefinderskeepers.com/assets/images/_profiles/nikau/thumb.jpg',
                subCategories: [
                    {
                        id: 27,
                        name: 'Candles',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 28,
                        name: 'Ceramics',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 29,
                        name: 'Furniture',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 30,
                        name: 'Homewares',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 31,
                        name: 'Lighting',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 32,
                        name: 'Pet Accessories',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 33,
                        name: 'Plants',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 34,
                        name: 'Publications & Books',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 35,
                        name: 'Stationary',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 36,
                        name: 'Textiles',
                        description: '',
                        parentCategoryId: 6,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    }
                ]
            },
            {
                id: 7,
                parentCategoryId: null,
                name: 'Outdoor & Adventure',
                description: '',
                slug: 'outdoor-adventure',
                // tslint:disable-next-line:max-line-length
                imageUrl: 'https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/Gth53OVmqzIOuVbtfF5zbeDHrmEOunB1dSz6ubui1507855704.jpeg',
                subCategories: [
                    {
                        id: 37,
                        name: 'Skate & Surf',
                        description: '',
                        parentCategoryId: 7,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 38,
                        name: 'Camping Accessories',
                        description: '',
                        parentCategoryId: 7,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 39,
                        name: 'Outdoor Products',
                        description: '',
                        parentCategoryId: 7,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 40,
                        name: 'Bike Accessories',
                        description: '',
                        parentCategoryId: 7,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 41,
                        name: 'Travel',
                        description: '',
                        parentCategoryId: 7,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    }
                ]
            },
            {
                id: 8,
                parentCategoryId: null,
                name: 'Wellbeing & Beauty',
                description: '',
                slug: 'wellbeing-beauty',
                // tslint:disable-next-line:max-line-length
                imageUrl: 'https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/AoH9XlmsMADnoQa6eXZOzZZ8Z1A0d654DTyJJ20i1505251806.jpeg',
                subCategories: [
                    {
                        id: 42,
                        name: 'Yoga',
                        description: '',
                        parentCategoryId: 8,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 43,
                        name: 'Skate & Surf',
                        description: '',
                        parentCategoryId: 8,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 44,
                        name: 'Soaps',
                        description: '',
                        parentCategoryId: 8,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 45,
                        name: 'Beauty & Nailcare',
                        description: '',
                        parentCategoryId: 8,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    },
                    {
                        id: 46,
                        name: 'Fragrances',
                        description: '',
                        parentCategoryId: 8,
                        subCategories: [], imageUrl: '',
                        slug: ''
                    }
                ]
            }
        ],
        'pagination': {
            'total': 8,
            'count': 8,
            'perPage': 15,
            'currentPage': 1,
            'totalPages': 1,
            'links': []
        }
    };
}
