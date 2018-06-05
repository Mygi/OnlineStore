import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-form-save',
  templateUrl: './form-save.component.html',
  styleUrls: ['./form-save.component.scss']
})
export class FormSaveComponent implements OnInit {
  @Input() btnLabel = '';
  @Input() isValid = false;
  @Output() saveTrigger = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {}

  trigger() {
    this.saveTrigger.emit(true);
  }
}
