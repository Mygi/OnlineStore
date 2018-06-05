import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// shared servvices
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { AuthUser } from '../../models/auth-user.model';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss']
})
export class ShopInfoComponent implements OnInit {

  constructor(private auth: AuthenticationProvider ) { }
  user = new AuthUser();
  ngOnInit() {
  }
  getUserName() {
    this.user = this.auth.getAuthUser() as AuthUser;
     if (this.user ) {
       return this.user.getName();
     }
    return '';
  }
}
