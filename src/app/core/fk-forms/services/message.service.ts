import { Injectable } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {
  private _msgs: Message[] = [];
  messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  constructor() { }

  public sendErrorMessage(title: string, message: string) {
    this.sendMessage('error', title, message);
  }
  public sendInfoMessage(title: string, message: string) {
    this.sendMessage('info', title, message);
  }
  public sendSuccessMessage(title: string, message: string) {
    this.sendMessage('success', title, message);
  }
  public sendMessage(severity: string, title: string, message: string) {
    this._msgs = [];
    this._msgs.push({ severity: severity, summary: title, detail: message });
    this.messages.next(this._msgs);
  }
  public getMessages() {
    return this._msgs;
  }
  public clear() {
    this._msgs = [];
    this.messages.next(this._msgs);
  }
}
