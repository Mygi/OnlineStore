import { Image } from '../../../core/file-handler/models/image.model';

export class ImageMock {
    images: Image[] = [];

    constructor() {
        // tslint:disable-next-line:max-line-length
        this.images.push( new Image('https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/1bHmn6owZGeHA5JqFO73vledXl4pqiBomtxdCVMW1502784196.jpeg', 1));
           // tslint:disable-next-line:max-line-length
        this.images.push(new Image('https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/1bHmn6owZGeHA5JqFO73vledXl4pqiBomtxdCVMW1502784196.jpeg', 2));
           // tslint:disable-next-line:max-line-length
        this.images.push(new Image('https://cdn.shopify.com/s/files/1/1193/9534/products/Polli_Design_-_Lilly_at_Dawn_-_Share-37crop_1024x1024.jpg?v=1500960413', 3));
           // tslint:disable-next-line:max-line-length
        this.images.push(new Image('https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/jIp7ZHphB385zrGztnVmz1gUOy0T9B3vtzas9qsc1507264519.jpeg', 4));
           // tslint:disable-next-line:max-line-length
        this.images.push(new Image('https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/UTbynkPg0msG8VWtBT7GSWoED9kj8EJa3ZfWXbv61503278917.jpeg', 6));
           // tslint:disable-next-line:max-line-length
        this.images.push(new Image('https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/pGqG5irgujsRcJbATRRRcLRZthZrcqZoq9Jweek31505250231.jpeg', 7));
           // tslint:disable-next-line:max-line-length
        this.images.push(new Image('https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/phpAm7OH1yJzGZswkSYFWWbLpNn5U1qvxB1kFTnA1507614554.jpeg', 8));
           // tslint:disable-next-line:max-line-length
        this.images.push(new Image('https://s3-ap-southeast-2.amazonaws.com/markets.thefinderskeepers.com/profile-images/yT6KiIF5Z3zIOF2kvyn96iWKI5lVqc2zRiNkXVRm1505742785.jpeg', 9));
           // tslint:disable-next-line:max-line-length
        this.images.push(new Image('https://www.batucada-fashion.com/batucada_images/produits/indian_bal._c30_a.jpg', 10));
           // tslint:disable-next-line:max-line-length
        this.images.push(new Image('https://www.batucada-fashion.com/batucada_images/produits/bijoux-jewels-necklace-multicolor-blue-collier-bleu-skin-silicone-gomme-rubber_prd.png', 10));
    }
}
