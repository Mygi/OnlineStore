import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/categories.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  constructor(private categoryService: CategoryService ) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data,
      error => console.warn(error)
    );
  }
}
