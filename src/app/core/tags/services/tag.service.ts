import { Injectable, Inject } from '@angular/core';
import { Tag } from '../models/tag.model';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../global/contracts/config/app-config';
import { APP_CONFIG } from '../../../app.config';
import { Observable } from 'rxjs';
import { TagHandlerService, TagContract } from '../../../global/contracts/modules/tag.contract';
import { map } from 'rxjs/operators';

@Injectable()
export class TagService extends TagHandlerService {

  private selectedTags: Tag[] = [];

  constructor(http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    super(config, http);
  }
  public setServiceUrl(config: AppConfig): string {
    return config.baseUrl + config.httpServiceUrls.tags + config.defaultDataSuffix;
  }
  /**
   * Mainly enforcing type safety. If you can access
   * this and write to it - state won't be broken
   * as init allows for write but you could accidently
   * empty it.
   * @returns
   * @memberof selectedTags
   */
  public getAllFromList(): TagContract[] {
    return this.selectedTags;
  }

  /**
   * Set the selected Catagories from a list
   *
   * @param {Tag[]} selectedTags
   * @memberof TagService
   */
  public initList(selectedTags: Tag[]): void {
    this.selectedTags = selectedTags;
  }


  /**
   * Select catagory and all parent categories
   * And add them to selected list
   * @private
   * @param {number} tagId
   * @memberof TagService
   */
  public addToList(alias: Tag): boolean {
    if (!this.hasItem(alias.id)) {
      // console.log(alias);
      // console.log(alias.id);
      // console.log(this.selectedTags);
      this.selectedTags.push(alias);
      return true;
    }
    return false;
  }

  /**
   * Shallow remove. Will not remove parent categories for child.
   * Could check for orphans - but it starts to seem unintuitve.
   * @param {number} tagId
   * @memberof TagService
   */
  public deleteFromList(tagId: number): boolean {
    if (this.hasItem(tagId)) {
      const index = this.selectedTags.findIndex(x => x.id === tagId);
      this.selectedTags.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get a category from a selected list
   *
   * @param {number} tagId
   * @returns {Tag}
   * @memberof TagService
   */
  public getItem(tagId: number): Tag {
    return this.selectedTags.find(x => x.id === tagId);
  }

  /**
   * Check if the category has already been selected
   *
   * @param {number} tagId
   * @returns {boolean}
   * @memberof TagService
   */
  public hasItem(tagId: number): boolean {
    return (this.selectedTags.findIndex(x => x.id === tagId) !== -1);
  }

  /**
   * Save the selected tags to the database
   *
   * @memberof TagService
   */
  public saveList(): Observable<Tag[]> {
     this.selectedTags.forEach(element => {
      this.create(element);
    });
    return null;
  }

  /**
   *
   * @param type Get tags via http
   * @param allowLocal
   */
  public getTagsForType(type: string): Observable<Tag[]> {
    return this.http.get<{data: Tag[]}>(this.serviceUrl + '?foreignType=' + type).pipe(map(
      item => item.data));
  }
}
