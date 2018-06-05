// Core and Component
import { Component, OnInit } from '@angular/core';

// Models
import { Category } from '../../../../core/categories/models/categories.model';

// Services
import { CategoryService } from '../../../../core/categories/services/category.service';
import { CategoryContract, CategoryProvider } from '../../../../global/contracts/modules/category.contract';

@Component({
  selector: 'app-collections-grid-list',
  templateUrl: './collections-grid-list.component.html',
  styleUrls: ['./collections-grid-list.component.scss']
})
export class CollectionsGridListComponent implements OnInit {
  categories: CategoryContract[] = [];

  constructor(private dataService: CategoryProvider ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.dataService.getAll().subscribe(
      data  => this.categories = data,
      error => console.warn( error )
    );
  }
}
