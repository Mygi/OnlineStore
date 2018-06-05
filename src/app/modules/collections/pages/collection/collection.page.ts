import { Component, OnInit, Inject } from '@angular/core';

import { ProductContract, ProductsProvider, PRODUCTS_PROVIDER } from '../../../../global/contracts/modules/products.contract';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss']
})
export class CollectionComponent implements OnInit {
  filtersOpen = false;
  products: ProductContract[] = [];
  constructor(@Inject(PRODUCTS_PROVIDER) private dataService: ProductsProvider) { }

  ngOnInit( ) {
    this.getProducts();
  }
  toggleFilter() {
    this.filtersOpen = !this.filtersOpen;
  }
  getProducts() {
    this.dataService.getAll().subscribe(
      data => this.products = data,
      error => console.warn(error)
      // () => console.log('Get all complete' + this.featuredProducts[0].caption)
    );
  }
}

