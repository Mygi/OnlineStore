import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// For Navigation directives
import { RouterModule } from '@angular/router';

// services
import { CategoryHandlerService } from './services/category-handler.service';
import { CategorySelecterService } from './services/category-selecter.service';
import { FilteredOrthogonalNestedCategoriesService } from './services/filtered-orthogonal-nested-categories.service';
import { CategoryService } from './services/category.service';
// components
import { CategorySelectBoxComponent } from './components/category-select-box/category-select-box.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { TagsModule } from '../tags/tags.module';
import { FormsModule } from '@angular/forms';
import { CategoryChipsComponent } from './components/category-chips/category-chips.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TagsModule
  ],
  declarations: [CategoryFormComponent, CategorySelectBoxComponent, CategoryListComponent, CategoryChipsComponent
  ],
  providers: [
    CategoryHandlerService,
    CategorySelecterService,
    FilteredOrthogonalNestedCategoriesService,
    CategoryService
  ],
  exports: [CategoryFormComponent, CategorySelectBoxComponent, CategoryListComponent, CategoryChipsComponent]
})
export class CategoriesModule { }
