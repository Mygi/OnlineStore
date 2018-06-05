import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsGridListComponent } from './components/collections-grid-list/collections-grid-list.component';
// This breaks n-tier design and need to fix
import { ProductsModule } from '../products/products.module';
import { CoreInterfaceModule } from '../../core/core-interface/core-interface.module';
import { RouterModule } from '@angular/router';
import { CollectionComponent } from './pages/collection/collection.page';
// import { CollectionsGridListCompone}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreInterfaceModule,
    ProductsModule
  ],
  declarations: [
    CollectionsGridListComponent,
  CollectionComponent],
  exports: [CollectionsGridListComponent]
})
export class CollectionsModule { }
