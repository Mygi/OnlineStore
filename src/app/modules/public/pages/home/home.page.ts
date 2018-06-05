import { Component, OnInit, Inject } from '@angular/core';

import { ProductContract, ProductsProvider, PRODUCTS_PROVIDER } from '../../../../global/contracts/modules/products.contract';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent implements OnInit {

  products: ProductContract[] = [];
  constructor(@Inject(PRODUCTS_PROVIDER) private dataService: ProductsProvider) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.dataService.getAll().subscribe(
      data => this.products = data,
      error => console.warn(error)
    );
  }
  // arrange() {
  //   this.products.forEach( prodContract =>
  //     console.log(prodContract)
  //   );
  // }
}
