// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { AuthGuardServiceService } from '../security/guards/auth-guard-service.service';
import { RoleGuardService } from '../security/guards/role-guard.service';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';
import { ShopFormComponent } from './components/shop-form/shop-form.component';
import { ShopComponent } from './pages/shop/shop.page';

const shopRoutes: Routes = [
    {path: '', canActivate: [RoleGuardService], component: ShopFormComponent,
    data: { menuName: 'my shop', icon: 'fa-user', expectedRoles: ['seller'] } },
    { path: 'preview', canActivate: [RoleGuardService], component: ShopComponent,
          data: { expectedRoles: ['seller'] } },
    {
        path: 'dashboard', canActivate: [RoleGuardService], component: SellerDashboardComponent,
        data: { menuName: 'home', icon: 'fa-home', expectedRoles: ['seller'] }
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(shopRoutes)
    ],
    providers: [RoleGuardService],
    exports: [RouterModule]
})

export class ShopRoutesModule { }
