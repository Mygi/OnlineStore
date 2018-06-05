import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../../../core/fk-forms/services/message.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  @Input() token: string;
  @Input() emailAddress: string;
  @Input() userId: number;
  @Output() completed = new EventEmitter<boolean>(false);
  constructor(private _service: UserService, private _messages: MessageService) { }

  ngOnInit() {
  }

  send(event) {
    this._service.sendVerificationNewEmail(this.emailAddress, this.token, this.userId).subscribe(
        data => {
          this._messages.sendSuccessMessage('Updated', 'Your email address has been updated. Please log in again.');
          this.completed.emit(true);
        },
        error => this._messages.sendErrorMessage('Verification Failed', error['message']));
    }
}
