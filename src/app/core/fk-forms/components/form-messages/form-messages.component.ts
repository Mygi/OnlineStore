import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-form-messages',
  templateUrl: './form-messages.component.html',
  styleUrls: ['./form-messages.component.scss']
})
export class FormMessagesComponent implements OnInit {

  msgs: Message[] = [];
  constructor(private _service: MessageService) { }

  ngOnInit() {
    this._service.messages.subscribe(newValue =>
      this.msgs = newValue);
  }
}
