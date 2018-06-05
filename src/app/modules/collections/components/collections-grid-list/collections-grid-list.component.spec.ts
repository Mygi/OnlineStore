import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Mocking
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Under test
import { CollectionsGridListComponent } from './collections-grid-list.component';


// Config
import { APP_CONFIG, FKConfig } from '../../../../app.config';
import { MocksModule } from '../../../../mocks/mocks.module';

describe('CollectionsGridListComponent', () => {
  let component: CollectionsGridListComponent;
  let fixture: ComponentFixture<CollectionsGridListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MocksModule ],
      declarations: [ CollectionsGridListComponent ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
