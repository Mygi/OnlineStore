import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Product, ProductImage } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryHandler, CategoryContract } from '../../../../global/contracts/modules/category.contract';
import { ProductItem } from '../../models/product-detail.model';
import { ProductVariant, ProductAttribute, ProductAttributeType, ProductAttributeFull } from '../../models/product-attribute.model';
import { Image } from '../../../../core/file-handler/models/image.model';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { Shop } from '../../../shop/models/shop.model';
import { TagService } from '../../../../core/tags/services/tag.service';
import { ProductItemService } from '../../services/product-item.service';
import { ShopService } from '../../../shop/services/shop.service';
import { UserProfile } from '../../../security/models/user-profile.model';
import { ImageContract } from '../../../../global/contracts/modules/image.contract';
import { MessageService } from '../../../../core/fk-forms/services/message.service';
import { BrowserHandlerService } from '../../../../global/fk-browser/services/browser-handler.service';
import { BrowserState } from '../../../../global/fk-browser/models/browser.model';
import { BehaviorSubject } from 'rxjs';
import { ShopProvider, SHOP_PROVIDER } from '../../../../global/contracts/modules/shop.contract';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {

  openAttributeModal = false;
  editing = false;
  canSave = false;
  canCreate = false;
  hasOptions = false;
  blocked = false;
  private selectedPanel = 0;
  public product: Product;
  private shop: Shop;
  public attributes: ProductAttributeFull[] = [];
  private _cleanCategories: CategoryContract[] = [];
  private stateSubscripton;
  private _categorySubcription;
  private defaultProductItemId = 0;
  private _processing = new BehaviorSubject<boolean>(false);
  constructor(private route: ActivatedRoute, private service: ProductService, private categoryHandler: CategoryHandler,
    private auth: AuthenticationProvider, private tagService: TagService, private itemService: ProductItemService,
    @Inject(SHOP_PROVIDER) private shopService: ShopProvider,
    private _service: MessageService, private _router: Router,
    private _browser: BrowserHandlerService) { }


  ngOnDestroy(): void {
    if (this.stateSubscripton) {
      this.stateSubscripton.unsubscribe();
    }
    if (this._categorySubcription) {
      this._categorySubcription.unsubscribe();
    }
  }
  ngOnInit() {
    // Default Product
    // routes
    this._service.clear();
    this._processing.subscribe(
      state => {
        // console.log(state);
        this.blocked = state;
      }
    );
    this.route.paramMap.forEach( (params: ParamMap) => {
      if ( params.has('id') ) {
        this.getProduct(+params.get('id'));
        this.editing = true;
      } else {
        this.product = new Product(0, '', '', '');
        this.product.productCategories = [];
        this.product.gallery = { data: [] };
        this.product.tags = {data: [] };
        this.product.masterItem = {data: new ProductItem()};
        this.product.items = { data: [] };
        this.product.shopID = 0;
        this.product.shopName = '';
        this.editing = false;
        this.product.shopID = this.auth.getAuthProfile().getShopId();
      }
    });
    const authProfile = this.auth.getAuthProfile() as UserProfile;
    this.shop = authProfile.getShop();
    // console.log(this.shop);
    this.categoryHandler.initList([]);
    this._categorySubcription = this.categoryHandler.getCategoryState().subscribe(
      val => {
        if (val) {
          this.filterCategories();
        }
      });
  }
  /**
   * Must be performed after page Loade
   * Consider using local storage for categories
   * @private
   * @memberof ProductItemComponent
   */
  private filterCategories(): void {
    const filteredArray: number[] = [];
    this.shop.shopCategories.forEach(cat =>
      filteredArray.push(cat.id));
    this.categoryHandler.applyFilters(filteredArray, 0);
  }

  /**
   * Gets the full product fdetails from
   * the database
   * @param {number} id
   * @memberof ProductItemComponent
   */
  getProduct(id: number) {
    this._processing.next(true);
    this.service.getProduct(id).subscribe( product => {
      this.product = product;
      this.editing = true;
      this.canSave = true;
      // console.log(product);
      this._cleanCategories = product.productCategories;
      this.categoryHandler.initList(product.productCategories);
      // console.log(product);
      if (product.items.data.length === 0 ) {
        this.createDefaultProductItem();
      } else if (product.items.data.length === 1) {
        product.items.data[0].isDefault = true;
        this.hasOptions = false;
        if (product.items.data[0].variants.data.length !== 0 ) {
          this.hasOptions = true;
        }
        this.defaultProductItemId = product.items.data[0].productItemID;
      } else {
        this.hasOptions = true;
        const defaultIndex = this.product.items.data.findIndex( x => x.isDefault === true);
          if (defaultIndex !== -1 ) {
            this.defaultProductItemId = this.product.items.data[defaultIndex].productItemID;
          } else {
            product.items.data[0].isDefault = true;
            this.defaultProductItemId = product.items.data[0].productItemID;
          }
      }
      this.canSave = true;
      this._processing.next(false);
      // console.log(product);
    });
  }

  // Modal and Captions
  editImage() {
    this.openAttributeModal = true;
  }
  changeEditing(newState: boolean) {
    this.editing = newState;
    return false;
  }

  // Categories
  onRemove(event: any) {
    // console.log('remove');
  }

  // Status messages
  sendMessage(message: any) {
    this._service.sendInfoMessage('Updated', message);
  }

  // Product States
  createProduct(state: boolean) {
    if (this.product.title !== '' && this.product.description !== '') {
      this._processing.next(true);
      this.service.createProduct(this.product, this.product.shopID).subscribe(
        data => {
          this.product.productID = data.productID;
          this.product.productOrder = data.productOrder;
          this.product.masterItem = data.masterItem;
          this.product.slug = data.slug;
          this.editing = true;
          this._service.sendSuccessMessage('Product created', ' The  product has been created');
          if (this.product.items.data.length === 0 && !this.hasOptions) {
            this.createDefaultProductItem();
          } else {
            this.canSave = true;
          }
          this._processing.next(false);
        },
        error => this._service.sendErrorMessage('Error', ' The product items could not be created: ' + error.error.message)
      );
    }
  }

  saveAllItems(scrollIndex?: number) {
    this._processing.next(true);
        for (let index = 0; index < this.product.items.data.length; index++) {
          if (this.product.items.data[index].productItemID === 0) {
            this.service.createProductItem(this.product.items.data[index]).subscribe(
              result => {
                this.product.items.data[index].productItemID = result.productItemID;
                if (this.product.items.data.length === index + 1) {
                  this.service.getProduct(this.product.productID).subscribe(product => {
                    this.product = product;
                    this._service.sendSuccessMessage('All product Items created', ' The  product items have been created');
                    this._processing.next(false);
                  });
                }
              },
              error => {
                this._service.sendErrorMessage('Error', ' The product items could not be created: ' + error.error.message);
                this._processing.next(false);
              }
            );
          } else {
            this.saveItem(this.product.items.data[index], index);
            if (this.product.items.data.length === index + 1) {
              this.service.getProduct(this.product.productID).subscribe(product => {
                this.product = product;
                this._service.sendSuccessMessage('All items saved', 'All product items have been updated');
                this._processing.next(false);
              });
            }
            // .saveProductItem({ item: this.product.items.data[index], asTemplate: false}, index);
          }
        }
  }
  deleteItem(id: number): void {
    if (this.product.status === 'published') {
      this._service.sendInfoMessage('Warning', ' Can not delete product items that have been published. Disable instead.');
      return;
    }
    this._processing.next(true);
    this.service.deleteProductItem(id).subscribe( result => {
        const index = this.product.items.data.findIndex( x => x.productItemID === id );
        if (index !== -1) {
          this.product.items.data.splice(index, 1);
        }
        this.service.getProduct(this.product.productID).subscribe(product => {
          this.product = product;
          this._service.sendSuccessMessage('Item Deleted', 'Product Item was removed');
          this._processing.next(false);
        });
      },
      error => this._service.sendErrorMessage('Error', ' The product items could not be deleted: ' + error.error.message)
    );
  }
  private createDefaultProductItem() {
    this.product.items.data.push(this.itemService.generateDefaultProductItem(this.product.productID, true, undefined, true));
    this._processing.next(true);
    // console.log('Added item?');
    this.service.createProductItem(this.product.items.data[0]).subscribe(
      result => {
        this.product.items.data[0].productItemID = result.productItemID;
        this._service.sendSuccessMessage('Default Item created', ' The  default product item has been created');
        this._processing.next(false);
        this.canSave = true;
      },
      error => this._service.sendErrorMessage('Error', ' The product item could not be created: ' + error.error.message)
    );
  }
  /**
   *
   */
  private save() {
    if (this.product.title !== '' && this.product.description !== '') {
      if ( this.editing ) {
        this.product.productCategories = this.categoryHandler.getAllFromList();
        this.product.tags = { data: this.tagService.getAllFromList() };
        this.service.saveProduct( this.product ).subscribe(
          data => this._service.sendSuccessMessage('Saved', ' The Product has been saved'),
          error => this._service.sendErrorMessage('Error', error.error.message)
        );
      }
      this.canCreate = true;
    }
  }
  public saveItem(item: ProductItem, index: number, withReload?: boolean) {
    if (this._processing.getValue() === false) {
      this._processing.next(true);
    }
    this.service.saveProductItem(item).subscribe(
          data => {
            if ( withReload ) {
              this.service.getProduct(this.product.productID).subscribe(product => {
                this.product = product;
                this._service.sendSuccessMessage('Saved', ' The item has been saved with ID - and synced: ' + data.productItemID);
                this._processing.next(false);
              });
            } else {
              this._service.sendSuccessMessage('Saved', ' The item has been saved with ID: ' + data.productItemID);
              this._processing.next(false);
            }
          },
          error => this._service.sendErrorMessage('Error', ' The item could not be saved' + error.error.message)
        );
  }
  public updateGallery(event: { item: ProductItem, asTemplate: boolean }, index: number) {
    if (!event.asTemplate) {
      this._processing.next(true);
      this.saveItem(event.item, index);
      this.service.getProductGallery(this.product.productID).subscribe(
        result => {
          this.product.gallery = result.gallery;
          this._processing.next(false);
        },
      error => {
        this._processing.next(false);
      });
    } else {
      this.saveProductItem({ item: event.item, asTemplate: event.asTemplate }, index);
    }
  }
  // Bubbles Up from child components
  public saveProductItem(event: { item: ProductItem, asTemplate: boolean }, index: number) {
    // this.save(); We may need to change Product!!!TODO
    if (!event.item.isDefault) {
        if ( this.product.items.data.length === 1) {
          event.item.isDefault = true;
        }
        this.saveItem(event.item, index);
        return;
    }
    // Only save the default
    if ( !event.asTemplate && (event.item.productItemID === this.defaultProductItemId) ) {
      this.saveItem(event.item, index);
      return;
    }
    this.defaultProductItemId = event.item.productItemID;
      this.product.items.data.forEach(
        productItem => {
          if (event.asTemplate) {
            productItem.discountPrice = event.item.discountPrice;
            productItem.originalPrice = event.item.originalPrice;
            productItem.SKU = event.item.SKU;
            productItem.specifications = event.item.specifications;
            productItem.salePrice = event.item.salePrice;
            productItem.imageURL = event.item.imageURL;
            productItem.imageID = event.item.imageID;
            productItem.stock = event.item.stock;
            productItem.trackInventory = event.item.trackInventory;
            productItem.onSale = event.item.onSale;
          }
          if ( event.item.isDefault && productItem.productItemID !== event.item.productItemID ) {
            productItem.isDefault = false;
            window.scrollTo(0, 200);
            this.selectedPanel = 0;
          }
        });
    this.saveAllItems(event.item.productItemID);
  }

  // In case we want an OnChange Handler
  UpdateProduct( state: boolean) {
    this.save();
  }

  // Accordion
  selectPanel(index: number): void {
    this.selectedPanel === index ? this.selectedPanel = undefined : this.selectedPanel = index;
  }
  selected(index: number): boolean {
    return this.selectedPanel === index;
  }
  saveTags(event) {
    this._processing.next(true);
    this.service.saveTags(event, this.product.productID).subscribe(
      data => {
        this._processing.next(false);
        this._service.sendSuccessMessage('Tags Saved', ' The product tages have been saved with');
      },
      error => {
        this._processing.next(false);
        this._service.sendErrorMessage('Error', ' The product tags could not be saved: ' + error.error.message);
      }
    );
  }
  saveCategories(event) {
    this._processing.next(true);
    this.service.saveCategories(this.categoryHandler.getAllFromList(), this.product.productID).subscribe(
      data => {
        this._service.sendSuccessMessage('Categories Saved', ' The product categories have been updated');
        this._processing.next(false);
      },
      error => this._service.sendErrorMessage('Error', ' The product categories could not be saved: ' + error.error.message),
    );
  }
  getEndPoint(): string {
    return this.service.getImageHandlerEndPoint(this.product.productID);
  }
  updateImages(event: ImageContract) {
    // May need to update product?
    this._processing.next(true);
    this.service.getProduct(this.product.productID).subscribe(product => {
      this.product = product;
      this._service.sendSuccessMessage('Images Updated', ' The product images have been updated');
      this._processing.next(false);
    });
  }
  showPreview() {
    this._router.navigate(['/sellers/products/preview', this.product.productID]);
  }
}
