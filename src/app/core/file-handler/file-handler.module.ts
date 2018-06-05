import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// file handling
import { FileUploadService } from './services/file-upload.service';
import { ImageUploadModalComponent } from './components/image-upload-modal/image-upload-modal.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';
import { ImageGallerySelecterComponent } from './components/image-gallery-selecter/image-gallery-selecter.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { KendoUploaderComponent } from './components/kendo-uploader/kendo-uploader.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt';
@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    FormsModule,
    UploadModule
  ],
  declarations: [ImageUploadModalComponent, ImageGallerySelecterComponent, KendoUploaderComponent],
  exports: [ImageUploadModalComponent, KendoUploaderComponent],
  providers: [FileUploadService,
  { provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  } ]
})
export class FileHandlerModule { }
