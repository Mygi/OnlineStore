import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryAlias, Category } from '../../models/categories.model';
/**
 * Is it better than the categories are handled outside of the box?
 * Two triggers - 1 is to trigger the model is modified
 * Anothet is to trigger a nest update
 * @export
 * @class CategorySelectBoxComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-category-select-box',
  templateUrl: './category-select-box.component.html',
  styleUrls: ['./category-select-box.component.scss']
})


export class CategorySelectBoxComponent implements OnInit {

  @Input() depth: number;
  @Input() categories: Category[] = [];
  @Input() parentId: number;
  @Output() toggled = new EventEmitter<{depth: number, category: Category}>();
  @Output() addCategory = new EventEmitter<{ depth: number, category: Category }>();
  private selectedCategory: Category;

  constructor() { }
  ngOnInit() {
    if (this.categories === undefined) {
      return;
    }
    if  (this.categories[0] !== undefined) {
      this.toggle(this.categories[0].id.toString());
    }
  }

  /** This does not cause a parent level filter! */
  /**
   * One option is for this method to be handled by a parent class instead
   * which then hands back the catagories
   * In which case - this component is just a case for selecting and adding
   * parts - which isn't bad - use @Output instead!!!IMPORTABT
   * @param {string} categoryId
   * @memberof CategorySelectBoxComponent
   */
  toggle(categoryId: string) {
    const cat = this.categories.find( x => x.id === +categoryId);
    if ( cat ) {
      this.selectedCategory = cat;
        this.toggled.emit( {depth: this.depth, category: this.selectedCategory});
      }
  }
  addSelectedCategory() {
    this.addCategory.emit({ depth: this.depth, category: this.selectedCategory });
  }
  hasCategories(): boolean {
    if (this.categories === undefined) {
      return false;
    }
    if (this.categories.length === 0 ) {
      return false;
    }
    return true;
  }
}
