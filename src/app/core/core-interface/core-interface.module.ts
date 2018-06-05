import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesModule } from '../categories/categories.module';
import { FileHandlerModule } from '../file-handler/file-handler.module';
import { StorageModule } from '../storage/storage.module';
import { TagsModule } from '../tags/tags.module';
import { WishlistModule } from '../wishlist/wishlist.module';
import { FkFormsModule } from '../fk-forms/fk-forms.module';

@NgModule({
  imports: [
    CommonModule,
    CategoriesModule,
    FileHandlerModule,
    StorageModule,
    TagsModule,
    WishlistModule,
    FkFormsModule
  ],
  declarations: [],
  exports: [
    TagsModule,
    CategoriesModule,
    FileHandlerModule,
    StorageModule,
    TagsModule,
    WishlistModule,
    FkFormsModule
  ]
})
export class CoreInterfaceModule { }
