import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from './file-upload.service';
import { APP_CONFIG, FKConfig } from '../../../app.config';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MocksModule } from '../../../mocks/mocks.module';
describe('FileUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      providers: [FileUploadService]
    });
  });

  it('should be created', inject([FileUploadService], (service: FileUploadService) => {
    expect(service).toBeTruthy();
  }));
});
