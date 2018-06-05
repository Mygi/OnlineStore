import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadModalComponent } from './image-upload-modal.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadService } from '../../services/file-upload.service';
import { MockCoreModule } from '../../../../mocks/mockCore.module';

describe('ImageUploadModalComponent', () => {
  let component: ImageUploadModalComponent;
  let fixture: ComponentFixture<ImageUploadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FileUploadModule, MockCoreModule],
      declarations: [ ImageUploadModalComponent ],
      providers: [FileUploadService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
