import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-totals',
  templateUrl: './cart-totals.component.html',
  styleUrls: ['./cart-totals.component.scss']
})
export class CartTotalsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
}
