import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoUploaderComponent } from './kendo-uploader.component';
import { UploadModule } from '@progress/kendo-angular-upload';

describe('KendoUploaderComponent', () => {
  let component: KendoUploaderComponent;
  let fixture: ComponentFixture<KendoUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UploadModule],
      declarations: [ KendoUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
