import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.scss']
})
export class ShippingOptionsComponent implements OnInit {
  @Input() shippingType: string;
  constructor() { }

  ngOnInit() {
  }

}
