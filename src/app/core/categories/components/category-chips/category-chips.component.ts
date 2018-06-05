import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryAlias } from '../../models/categories.model';

@Component({
  selector: 'app-category-chips',
  templateUrl: './category-chips.component.html',
  styleUrls: ['./category-chips.component.scss']
})
export class CategoryChipsComponent implements OnInit {

  @Input() selectedCategories: CategoryAlias[] = [];
  @Output() removed = new EventEmitter<CategoryAlias>();

  constructor() { }

  ngOnInit() { }
  removeShopCategory(categoryId: number) {
    const index = this.selectedCategories.findIndex(x => x.id === categoryId);
    // console.log(index);
    if (index !== -1) {
      this.removed.emit(this.selectedCategories[index]);
      // this.selectedCategories.splice(index, 1);
    }
  }
}
