import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSearchComponent } from './tag-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TagService } from '../../services/tag.service';
import { APP_CONFIG, FKConfig } from '../../../../app.config';

describe('TagSearchComponent', () => {
  let component: TagSearchComponent;
  let fixture: ComponentFixture<TagSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSearchComponent ],
      imports: [HttpClientTestingModule],
      providers: [TagService,
        { provide: APP_CONFIG, useValue: FKConfig }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
