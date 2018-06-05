import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreInterfaceModule } from '../../core/core-interface/core-interface.module';
import { MessageCentreComponent } from './pages/message-centre/message-centre.page';

@NgModule({
  imports: [
    CommonModule,
    CoreInterfaceModule
  ],
  declarations: [MessageCentreComponent],
  exports: []
})
export class MessagingModule { }
