import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo, UploadEvent, SuccessEvent } from '@progress/kendo-angular-upload';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-kendo-uploader',
  templateUrl: './kendo-uploader.component.html',
  styleUrls: ['./kendo-uploader.component.scss']
})
export class KendoUploaderComponent implements OnInit {
  public events: string[] = [];
  public imagePreviews: FileInfo[] = [];
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png', 'jpeg'],
    maxFileSize: 2194304
  };
  // public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
  @Input() caption = '';
  @Output() imageUpdated = new EventEmitter<Image>();
  @Input() endPoint = 'shop';
  @Input() id: number;
  @Input() imageUrl?: string;
  display = false;
  savedUrl = '';
  constructor() { }

  ngOnInit() {
    this.savedUrl = (' ' + this.imageUrl).slice(1);
  }

  public clearEventHandler(e: ClearEvent): void {
    this.log('Clearing the file upload');
    this.imageUrl = (' ' + this.savedUrl).slice(1);
  }
  uploadEventHandler(e: UploadEvent) {
    console.log(e);
    e.data = {
      file: e.files[0].rawFile
    };
  }
  public completeEventHandler(e: SuccessEvent) {
    if (e.response.body !== undefined ) {
      const img = new Image(e.response.body['url']);
      if (e.response.body['data'] !== undefined) {
        img.id = e.response.body['data']['productImageID'];
        img.remoteUrl = e.response.body['data']['url'];
        console.log(img);
        this.savedUrl = (' ' + e.response.body['data']['url']).slice(1);
      } else {
        this.savedUrl = (' ' + e.response.body['url']).slice(1);
      }
      this.log(`All files processed`);
      this.imageUpdated.emit(img);
    }
  }
  public removeEventHandler(e: RemoveEvent): void {
    this.log(`Removing ${e.files[0].name}`);
    this.imageUrl = (' ' + this.savedUrl).slice(1);
    this.display = false;
    e.preventDefault();
  }

  public selectEventHandler(e: SelectEvent): void {
    const that = this;
    e.files.forEach((file) => {
      that.log(`File selected: ${file.name}`);

      if (!file.validationErrors) {
        const reader = new FileReader();

        reader.onload = function (ev) {
          that.imageUrl = ev.target['result'];
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
