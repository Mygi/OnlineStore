import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';


@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {
  @Input() navigationParent = '/';
  @Input() imageUrl = '';

  constructor(private router: Router, private auth: AuthenticationProvider ) {
   }
  ngOnInit() {
    if ( this.auth.getAuthProfile() !== null && this.auth.getAuthProfile() !== undefined) {
       this.imageUrl = this.auth.getAuthProfile().getImageUrl();
    }
    this.auth.subscribeAuthProfile().subscribe(
      updated => this.imageUrl = updated.getImageUrl()
    );
  }
  getMenuItems() {
    if (!this.navigationParent) {
      return [];
    }
      const foundParent = this.router.config.find( x => x.path === this.navigationParent );
      if ( foundParent !== undefined) {
        return foundParent.children;
      }
    return [];
  }
}
