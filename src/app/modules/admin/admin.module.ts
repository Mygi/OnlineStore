import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageBannerComponent } from './pages/homepage-banner/homepage-banner.component';
import { ApproveProductsComponent } from './pages/approve-products/approve-products.component';
import { FeaturedProductsComponent } from './pages/featured-products/featured-products.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { UsersComponent } from './pages/users/users.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomepageBannerComponent, ApproveProductsComponent, FeaturedProductsComponent, NewArrivalsComponent, AllProductsComponent, CollectionsComponent, CategoriesComponent, UsersComponent, DashboardHomeComponent, AdminDashboardComponent]
})
export class AdminModule { }
