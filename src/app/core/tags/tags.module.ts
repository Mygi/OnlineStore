// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// 3rd party
import { TagInputModule } from 'ngx-chips';

// services
import { TagService } from './services/tag.service';

// components
import { TagSearchComponent } from './components/tag-search/tag-search.component';
import { TagFormComponent } from './components/tag-form/tag-form.component';
import { BadgeComponent } from './components/badge/badge.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    RouterModule
  ],
  declarations: [
    TagSearchComponent,
    TagFormComponent,
    BadgeComponent],
  exports: [
    TagSearchComponent,
    TagFormComponent,
    BadgeComponent ],
    providers: [TagService]
})
export class TagsModule { }
