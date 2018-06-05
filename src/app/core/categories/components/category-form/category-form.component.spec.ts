import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormComponent } from './category-form.component';
import { CategorySelectBoxComponent } from '../category-select-box/category-select-box.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { CategoryChipsComponent } from '../category-chips/category-chips.component';
import { MocksModule } from '../../../../mocks/mocks.module';
import { MockCoreModule } from '../../../../mocks/mockCore.module';
import { CategoryHandlerService } from '../../services/category-handler.service';
import { CategoryService } from '../../services/category.service';
import { DynamicNestedCategoriesService } from '../../services/dynamic-nested-categories.service';
import { FilteredOrthogonalNestedCategoriesService } from '../../services/filtered-orthogonal-nested-categories.service';
import { CategorySelecterService } from '../../services/category-selecter.service';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockCoreModule],
      declarations: [ CategoryFormComponent, CategorySelectBoxComponent, CategoryChipsComponent ],
      providers: [CategoryHandlerService, CategoryService, CategorySelecterService, FilteredOrthogonalNestedCategoriesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
