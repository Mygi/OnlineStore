// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { AuthGuardServiceService } from '../security/guards/auth-guard-service.service';
import { RoleGuardService } from '../security/guards/role-guard.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const productRoutes: Routes = [
    { path: '', component: ProductListComponent, canActivate: [RoleGuardService], data: { expectedRoles: ['seller'] } },
    { path: 'product/:id', component: ProductItemComponent, canActivate: [RoleGuardService], data: { expectedRoles: ['seller'] } },
    { path: 'new', component: ProductItemComponent, canActivate: [RoleGuardService], data: { expectedRoles: ['seller'] } },
    { path: 'preview/:id', component: ProductDetailComponent, canActivate: [RoleGuardService], data: { expectedRoles: ['seller'] } }
];
@NgModule({
    imports: [
        RouterModule.forChild(productRoutes)
    ],
    providers: [AuthGuardServiceService],
    exports: [RouterModule]
})

export class ProductRoutesModule { }
