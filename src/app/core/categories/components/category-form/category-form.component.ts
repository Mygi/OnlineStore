import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryHandlerService } from '../../services/category-handler.service';
import { CategoryContract, CategoryHandler } from '../../../../global/contracts/modules/category.contract';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  @Input() selectedCategories: CategoryContract[] = [];
  @Output() updated = new EventEmitter<CategoryContract[]>();
  constructor(public categoryHandler: CategoryHandler) { }

  ngOnInit() {
    // this.categoryHandler.initList(this.selectedCategories);
  }
  updateService( event: {depth: number , category: CategoryContract} ) {
    // console.log(event.category);
    this.categoryHandler.addToList(event.category);
    this.updated.emit(this.categoryHandler.getAllFromList());
  }
  removeService(event) {
    // console.log(event);
    this.categoryHandler.removeCategory(event);
    this.updated.emit(this.categoryHandler.getAllFromList());
  }
  onRemove(event: any) {
    // console.log('remove');
  }
}
