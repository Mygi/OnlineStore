import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFormComponent } from './tag-form.component';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { TagService } from '../../services/tag.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('TagFormComponent', () => {
  let component: TagFormComponent;
  let fixture: ComponentFixture<TagFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TagInputModule, HttpClientTestingModule, NoopAnimationsModule],
      declarations: [ TagFormComponent ],
      providers: [TagService, { provide: APP_CONFIG, useValue: FKConfig }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
