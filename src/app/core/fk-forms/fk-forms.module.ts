import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSaveComponent } from './components/form-save/form-save.component';
import { MessageService } from './services/message.service';
import { MessagesModule } from 'primeng/messages';
import { FormMessagesComponent } from './components/form-messages/form-messages.component';
import { FormDataService } from './services/form-data.service';
import { GrowlModule } from 'primeng/growl';
import { FkGrowlComponent } from './components/fk-growl/fk-growl.component';
import { FkDialogComponent } from './components/fk-dialog/fk-dialog.component';
import { DomHandler } from 'primeng/components/common/api';
@NgModule({
  imports: [
    CommonModule,
    MessagesModule
  ],
  declarations: [FormSaveComponent, FormMessagesComponent, FkGrowlComponent, FkDialogComponent],
  providers: [MessageService, FormDataService, DomHandler],
  exports: [FormSaveComponent, FormMessagesComponent, FkDialogComponent, FkGrowlComponent]
})
export class FkFormsModule { }
