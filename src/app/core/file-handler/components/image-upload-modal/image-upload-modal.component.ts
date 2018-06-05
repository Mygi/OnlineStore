import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Image } from '../../models/image.model';
import { FileUploadService } from '../../services/file-upload.service';
// tslint:disable-next-line:max-line-length
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo, UploadEvent, SuccessEvent, UploadComponent } from '@progress/kendo-angular-upload';
import { KendoUploaderComponent } from '../kendo-uploader/kendo-uploader.component';
@Component({
  selector: 'app-image-upload-modal',
  templateUrl: './image-upload-modal.component.html',
  styleUrls: ['./image-upload-modal.component.scss']
})
export class ImageUploadModalComponent implements OnInit {
  @Output() imageUpdated = new EventEmitter<Image>();
  @Output() closed = new EventEmitter<Image[]>();
  @Input() endPoint = '';
  images: {name: string, data: any }[] = [];
  clearUids: string[] = [];
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png', 'jpeg'],
    maxFileSize: 2194304
  };
  constructor(private fileHandler: FileUploadService) { }

  ngOnInit() {
    console.log('event fires');
    this.images = [];
  }
  public clearEventHandler(e: ClearEvent): void {
    console.log(e);
    this.images = [];
  }
  uploadEventHandler(e: UploadEvent) {
    console.log(e);
    e.data = {
      file: e.files[0].rawFile
    };
  }
  clearHandler(kendoUploadInstance: UploadComponent) {
    this.clearUids.forEach( uid =>
      kendoUploadInstance.removeFilesByUid(uid)
    );
  }
  public completeEventHandler(e: SuccessEvent, kendoUploadInstance: UploadComponent) {
    e.preventDefault();
    if (e.response.body !== undefined) {
      const img = new Image(e.response.body['url']);
      if (e.response.body['data'] !== undefined) {
        img.id = e.response.body['data']['productImageID'];
        img.remoteUrl = e.response.body['data']['url'];
        console.log(img);
      }
      this.log(`All files processed`);
      this.imageUpdated.emit(img);
      // this.images = [];
    }
    console.log(kendoUploadInstance);
    e.files.forEach(file =>
      // kendoUploadInstance.removeFilesByUid(file.uid)
      // console.log(file)
      this.clearUids.push(file.uid)
    );
  }
  public removeEventHandler(e: RemoveEvent): void {
    this.log(`Removing ${e.files[0].name}`);
    const index = this.images.findIndex( x => x.name === e.files[0].name);
    if ( index !== -1) {
      this.images.splice(index, 1);
    }
    // e.preventDefault();
  }

  public selectEventHandler(e: SelectEvent): void {
    const that = this;
    e.files.forEach((file) => {
      that.log(`File selected: ${file.name}`);

      if (!file.validationErrors) {
        const reader = new FileReader();
        const img = { name: file.name, data: undefined };
        reader.onload = function (ev) {
          console.log(ev);
          img.data = ev.target['result'];
          that.images.push(img);
        };
        // that.imagePreviews.unshift(image);

        reader.readAsDataURL(file.rawFile);
      }
    });
  }
  private log(event: string): void {
    console.log(event);
  }
}
