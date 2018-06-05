import { FeaturedItem } from '../../../modules/public/models/featured-item.model';
export class FeaturedProductMockData {
    featuredProducts: FeaturedItem[] = [
        {
            'link': '/collections',
            // tslint:disable-next-line:max-line-length
            'image': 'https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-gallery/ZDHGTP1UrGgTLIhCwCL4tiVSLyczcQmp2LL037Km.jpeg',
            'caption': 'Jewellry',
            'captionLink': '/products/',
            'shopName': 'Market jewellers',
            'shopLink': '/shop',
            'heading': 'handmade natural beauty',
            'buttonCssClass': 'btn-green',
            'shopId': 1,
            'productId': 1037
        },
        {
            'link': '/collections',
            // tslint:disable-next-line:max-line-length
            'image': 'https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-gallery/utuKLm6BEedQfcnynShAtWll4g7eVuUtQeCZcmJn.jpeg',
            'caption': 'See all stall holders',
            'captionLink': '/products/',
            'shopName': 'Melbourne market',
            'shopLink': '/shop',
            'heading': 'melbourne market guide SS17',
            'buttonCssClass': 'btn-magenta',
            'shopId': 2,
            'productId': 1037
        },
        {
            'link': '/collections',
            // tslint:disable-next-line:max-line-length
            'image': 'https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-gallery/InBEwFTLPwcADET7SXQghaKbAtnyTJB5m6UmNkJe.jpeg',
            'caption': 'Organic Soaps',
            'captionLink': '/products/',
            'shopName': 'Raw Suds',
            'shopLink': '/shop',
            'heading': 'don\'t get carried away margaret',
            'buttonCssClass': 'btn-blue',
            'shopId': 3,
            'productId': 1037
        }
    ];
}
