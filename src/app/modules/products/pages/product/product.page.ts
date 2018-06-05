import { Component, OnInit, Inject } from '@angular/core';
import { ProductContract, ProductsProvider, PRODUCTS_PROVIDER } from '../../../../global/contracts/modules/products.contract';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss']
})
export class ProductComponent implements OnInit {
  products: ProductContract[] = [];
  constructor(@Inject(PRODUCTS_PROVIDER) private dataService: ProductsProvider) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.dataService.getAll().subscribe(
      data => this.products = data,
      error => console.warn(error)
      // () => console.log('Get all complete' + this.featuredProducts[0].caption)
    );
  }
}
