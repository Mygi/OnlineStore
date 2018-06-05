import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// FK Modules

// Components
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { NestedRouteLoaderComponent } from './components/nested-route-loader/nested-route-loader.component';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';
import { CoreInterfaceModule } from '../../core/core-interface/core-interface.module';
import { SecurityModule } from '../security/security.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ShoppingCartModule,
    CoreInterfaceModule,
    SecurityModule
  ],
  declarations: [SideMenuComponent,
     BreadcrumbsComponent,
     DashboardMenuComponent,
     NestedRouteLoaderComponent
     ],
  exports: [
    // SideMenuComponent,
    BreadcrumbsComponent,
    DashboardMenuComponent,
    NestedRouteLoaderComponent
  ]
})
export class NavigationModule { }
