import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductAttribute } from '../../models/product-attribute.model';
import { ProductItemService } from '../../services/product-item.service';
import { ProductItem } from '../../models/product-detail.model';
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';
import { NguCarouselService } from '@ngu/carousel';
import { Image } from '../../../../core/file-handler/models/image.model';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  attributes: ProductAttribute[] = [];
  selectedProductItem: ProductItem = new ProductItem();
  public carouselTile: NguCarousel;
  private _carouselKey: string;
  public gallery: Image[] = [];
  public presentationGallery: Image[][] = [];
  qty = 0;
  showEditingPanel = false;
  public selectedImageID = 0;
  @Input() productId: number;
  constructor(private service: ProductService, private _route: ActivatedRoute, private _itemService: ProductItemService,
    private _carousalService: NguCarouselService, private _location: Location ) { }

  ngOnInit() {
    this.setTile();
    this._route.paramMap.forEach((params: ParamMap) => {
      if (params.has('id')) {
        this.getProduct(+params.get('id'));
      }
    });
    this._route.url.forEach( segment => {
      segment.forEach( item => {
        if (item.path === 'preview') {
          this.showEditingPanel = true;
        }
      });
    });
  }
  public goBack() {
    this._location.back();
  }
  public carouselTileLoad() {}
  public createGallery() {
    this.product.gallery.data.forEach(
      item => {
        if (this.gallery.findIndex(x => x.id === item.productImageID) === -1) {
          this.gallery.push(new Image(item.url, item.productImageID, undefined, item.caption, item.order));
        }
      });
      this.gallery.sort( (a, b) =>
          a.order - b.order
    );
    // this.product.items.data.forEach(item => {
    //   if (this.gallery.findIndex(x => x.id === item.imageID) === -1) {
    //     const caption = (item.variants === undefined) ? 'Default' : item.variants.data[0].label;
    //     this.gallery.push(new Image(item.imageURL, item.imageID, undefined, caption));
    //   }
    // });
    const tmpArray = this.gallery.slice(0);
    while (tmpArray.length) {
      this.presentationGallery.push( tmpArray.splice(0, 6));
    }
  }
  setTile() {
    this.carouselTile = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      speed: 400,
      interval: 10000,
      point: {
        visible: false
      },
      load: 1,
      touch: true,
      loop: true,
      easing: 'cubic-bezier(0, 0, 0.2, 1)'
    };
  }
  initDataFn(key: NguCarouselStore) {
    this._carouselKey = key.token;
  }
  public getProduct(id: number) {
    this.service.getPublicProduct(id).subscribe(product => {
        this.product = product;
        this.product.items.data = product.items.data.filter( x => x.isActive === true);
        if (this.product.masterItem.data.productItemID === undefined) {
          if (this.product.items.data.length !== 0) {
          this.selectedProductItem = this.product.items.data[0];
          }
        } else {
          this.selectedProductItem = this.product.masterItem.data;
        }
        this.attributes = this._itemService.getVariants(this.product.items.data);
        this.createGallery();
  });
  }
  public navigateToTile(index: number) {
    this.selectedImageID = index;
    const key = this.gallery.findIndex( x => x.id === index);
    if ( key !== -1 ) {
      this._carousalService.moveToSlide(this._carouselKey, key, true);
    }
  }

  public toggleAttributes(event: any, attribute: ProductAttribute) {
    const filtered = this.product.items.data.filter( x =>
       (x.variants.data.findIndex( y => y.attributeValueID === +event.target.value ) !== -1 ) );

    if ( filtered !== undefined ) {
      // console.log(filtered);
      const found = filtered.find( item => item.imageID !== null);
      if (found !== undefined ) {
        this.navigateToTile(found.imageID);
      }
    }
  }
}
