// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { AuthGuardServiceService } from './modules/security/guards/auth-guard-service.service';
import { RoleGuardService } from './modules/security/guards/role-guard.service';
import { NestedRouteLoaderComponent } from './modules/navigation/components/nested-route-loader/nested-route-loader.component';
import { SellerDashboardComponent } from './modules/shop/components/seller-dashboard/seller-dashboard.component';
import { LoginComponent } from './modules/security/components/login/login.component';
import { AccountFormComponent } from './modules/security/components/account-form/account-form.component';


import { AdminDashboardComponent } from './modules/admin/pages/admin-dashboard/admin-dashboard.component';
import { HomepageBannerComponent } from './modules/admin/pages/homepage-banner/homepage-banner.component';
import { ApproveProductsComponent } from './modules/admin/pages/approve-products/approve-products.component';
import { FeaturedProductsComponent } from './modules/admin/pages/featured-products/featured-products.component';
import { NewArrivalsComponent } from './modules/admin/pages/new-arrivals/new-arrivals.component';
import { AllProductsComponent } from './modules/admin/pages/all-products/all-products.component';
import { CollectionsComponent } from './modules/admin/pages/collections/collections.component';
import { CategoriesComponent } from './modules/admin/pages/categories/categories.component';
import { UsersComponent } from './modules/admin/pages/users/users.component';


const publicRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'verify/password/:key', component: LoginComponent },
  { path: 'verify/email/:email/token/:token', component: LoginComponent },
  { path: 'sellers', component: NestedRouteLoaderComponent, children: [
    {
      path: 'home', canActivate: [RoleGuardService], component: SellerDashboardComponent,
      data: { menuName: 'home', icon: 'fa-home', expectedRoles: ['seller'] }
    },
    {
      path: 'shop', canActivate: [RoleGuardService], loadChildren: 'app/modules/shop/shop.module#ShopModule',
      data: { menuName: 'my shop', icon: 'fa-user', expectedRoles: ['seller'] }
    },
    {
      path: 'products', canActivate: [RoleGuardService], loadChildren: 'app/modules/products/products.module#ProductsModule',
      data: { menuName: 'products', icon: 'fa-archive', expectedRoles: ['seller'] } },
    { 
      path: 'account', canLoad: [RoleGuardService], canActivate: [RoleGuardService], component: AccountFormComponent,
      data: { menuName: 'my account', icon: 'fa-cog', expectedRoles: ['seller'] }
    }
  ]},
  { path: 'admin', component: NestedRouteLoaderComponent, children: [
    {
      path: 'home', canActivate: [RoleGuardService], component: AdminDashboardComponent,
      data: { menuName: 'Home', icon: 'fa-home', expectedRoles: ['seller'] } 
    },
    {
      path: 'feature-slider', canActivate: [RoleGuardService], component: HomepageBannerComponent,
      data: { menuName: 'Feature Slider', icon: 'fa-images', expectedRoles: ['seller'] } 
    },
    {
      path: 'featured-products', canActivate: [RoleGuardService], component: FeaturedProductsComponent,
      data: { menuName: 'Featured Products', icon: 'fa-star', expectedRoles: ['seller'] } 
    },
    {
      path: 'new-arrivals', canActivate: [RoleGuardService], component: NewArrivalsComponent,
      data: { menuName: 'New Arrivals', icon: 'fa-seedling', expectedRoles: ['seller'] } 
    },
    {
      path: 'all-products', canActivate: [RoleGuardService], component: AllProductsComponent,
      data: { menuName: 'All Products', icon: 'fa-archive', expectedRoles: ['seller'] } 
    },
    {
      path: 'approve-products', canActivate: [RoleGuardService], component: ApproveProductsComponent,
      data: { menuName: 'Approve Products', icon: 'fa-smile', expectedRoles: ['seller'] } 
    },
    {
      path: 'users', canActivate: [RoleGuardService], component: UsersComponent,
      data: { menuName: 'Manage Users', icon: 'fa-user', expectedRoles: ['seller'] } 
    },
    {
      path: 'collections', canActivate: [RoleGuardService], component: CollectionsComponent,
      data: { menuName: 'Collections', icon: 'fa-box-full', expectedRoles: ['seller'] } 
    },
    {
      path: 'categories', canActivate: [RoleGuardService], component: CategoriesComponent,
      data: { menuName: 'Categories', icon: 'fa-book', expectedRoles: ['seller'] } 
    }
  ]} 
];
@NgModule({
  imports: [
  RouterModule.forRoot(publicRoutes)
  ],
  providers: [AuthGuardServiceService, RoleGuardService],
  exports: [RouterModule]
})

export class PublicRoutingModule { }
