import { Component, OnInit } from '@angular/core';

import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { Message } from 'primeng/components/common/api';

// to move to a contract
import { ImageContract } from '../../../../global/contracts/modules/image.contract';
import { CategoryHandler } from '../../../../global/contracts/modules/category.contract';
import { Shop } from '../../../../modules/shop/models/shop.model';
import { ShopService } from '../../../../modules/shop/services/shop.service';
import { Banking, BankServiceModel } from '../../models/banking-model.model';
import { BankingService } from '../../services/banking.service';
import { UserProfile } from '../../../security/models/user-profile.model';
import { MessageService } from '../../../../core/fk-forms/services/message.service';
import { Router } from '@angular/router';

export enum dataState {
  new,
  editing,
  inSync,
  processing
}
@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss']
})
export class ShopFormComponent implements OnInit {

  public shop: Shop = new Shop();
  private userId: number;
  // genericise this to data state
  private shopState: dataState = dataState.new;
  blockedPanel = true;
  public banks: BankServiceModel[];
  public bankingUnlocked = false;
  private _bankSate = dataState.new;
  public endPoint = '';
  password = '';
  display = false;
  authText = '';
  constructor(private service: ShopService, private userProfileService: AuthenticationProvider,
    public categoryHandler: CategoryHandler, private _bankingService: BankingService,
    private _messageService: MessageService, private _router: Router) {
  }
  /**
   * onInit event
   *
   * @memberof MyShopPageComponent
   */
  ngOnInit() {
    this._messageService.clear();
    this.setUser();
    this.shop.banking = this.generateDefaultBanking();

    this.categoryHandler.resetCategories();
    this.getHttpShop();
    this._bankingService.getBanks().subscribe(
      data => this.banks = data);
  }

  /**
   * Sets user from service
   *
   * @memberof MyShopPageComponent
   */
  setUser() {
    this.userId = this.userProfileService.getAuthUser().getId();
    this.shop.userId = this.userId;
  }

  /**
   * Get Shop from service
   *
   * @memberof MyShopPageComponent
   */
  getHttpShop() {
    this.service.getUserShop(this.userId).subscribe(
      data => this.arrangeShopData(data)
    );
  }

  /**
   * Post handle for http get service
   *
   * @param {Shop[]} filteredShops
   * @memberof MyShopPageComponent
   */
  arrangeShopData(filteredShops: Shop) {
    if (filteredShops) {
      this.shop = filteredShops;
      if (this.shop) {
        this.shopState = dataState.inSync;
        this.endPoint = this.service.getImageHandlerEndPoint(this.shop.id);
        this.categoryHandler.initList(this.shop.shopCategories);
        console.log(filteredShops);
        if (!('banking' in this.shop)) {
          this.shop.banking = this.generateDefaultBanking();
          this._bankSate = dataState.new;
        } else {
          this._bankSate = dataState.editing;
        }

      }
    }
  }

  private generateDefaultBanking(): Banking {
    const banking = new Banking();
    banking.accountName = '';
    banking.accountNumber = 0;
    banking.bsb = 0;
    // banking.bankName = '';
    banking.shopId = this.shop.id;
    return banking;
  }
  /**
   * This triggers a local storage update only
   *
   * @memberof MyShopPageComponent
   */
  save() {
    this.shopState = dataState.editing;
    this._messageService.sendInfoMessage('Saving', 'Please wait...');
    this.shop.shopCategories = this.categoryHandler.getAllFromList();
    this.service.synchroniseShop(this.shop).subscribe(
      data => this.postSaveHandle(data),
      error => this.handleError(error)
    );
    return false;
  }
  saveImage(image: ImageContract) {
    this.shop.shopImage = image.getUrl();
    console.log(this.shop.shopImage);
    this.save();
  }
  /**
   * Handle the Error state
   *
   * @param {*} error
   * @memberof MyShopPageComponent
   */
  private handleError(error: any) {
    this.shopState = dataState.editing;
    this._messageService.sendErrorMessage('Error', 'Your shop has not been updated');
  }

  /**
   * Habdle the Save event
   *
   * @param {Shop} data
   * @memberof MyShopPageComponent
   */
  private postSaveHandle(data: Shop) {
    this.service.getUserShop(this.userId).subscribe(
      result => {
        this.arrangeShopData(result);
        const profile = this.userProfileService.getAuthProfile() as UserProfile;
        profile.shop = this.shop;
        this.userProfileService.updateAuthProfile(profile);
        this.shopState = dataState.inSync;
        this._messageService.sendSuccessMessage('Shop Saved', 'Your shop has been updated');
      });
  }
  public saveBanking() {
    if (this._bankSate === dataState.new ) {
      this._bankingService.createBanking( this.shop.banking).subscribe(
        result => {
          this.shop.banking.id = result.data.bankAccountID;
          this._bankSate = dataState.editing;
          this._messageService.sendSuccessMessage('Banking Details Created', 'Banking details have been created' );
        },
        error => {
          this._messageService.sendErrorMessage('Banking Details Failed', 'Banking details have failed to be created' );
        }
      );
    } else {
      this._bankingService.saveBanking(this.shop.banking).subscribe(
          result => {
            this._messageService.sendSuccessMessage('Banking Details Created', 'Banking details have been created');
          },
          error => {
            this._messageService.sendErrorMessage('Banking Details Failed', 'Banking details have failed to be saved');
          });
    }
  }
  unlockBanking() {
    const email = this.userProfileService.getAuthUser().getEmailAddress();
    const id = this.userProfileService.getAuthUser().getId();
    this.authText = 'Authenticating. One moment please';
    this.userProfileService.authenticate(email, this.password).subscribe(
      result => {
        if (result.userID === id) {
          this.authText = '';
          this.bankingUnlocked = true;
          this.display = false;
        }
      },
    error => this.authText = 'Could not sign you in. Please try again');
  }
  showPreview() {
    this._router.navigate(['/sellers/shop/preview']);
  }
}
