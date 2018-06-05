export class FeaturedItem {
    link: string;
    image: string;
    caption: string;
    captionLink: string;
    shopName: string;
    shopLink: string;
    heading: string;
    buttonCssClass: string;
    shopId: number;
    productId: number;

    constructor( link: string, image: string, caption: string, captionLink: string, shopName: string,
                shopLink: string, heading: string, buttonCssClass: string, shopId: number, productId: number) {
        this.link = link;
        this.image = image;
        this.caption = caption;
        this.captionLink = captionLink;
        this.shopName = shopName;
        this.shopLink = shopLink;
        this.heading = heading;
        this.buttonCssClass = buttonCssClass;
        this.shopId = shopId;
        this.productId = productId;
      }
}
