import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../../../core/fk-forms/services/message.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Input() key: string;
  @Input() requiresOld = true;
  @Input() userId = 0;
  emailAddress = '';
  oldPassword: string;
  newPassword: string;
  newPassword_confirmation: string;
  saved = false;
  buttonLabel = 'Reset password';
  @Output() completed = new EventEmitter<boolean>(false);

  constructor(private _service: UserService, private _messages: MessageService) { }

  ngOnInit() {
  }
  save(event) {
    if (this.requiresOld) {
      this._service.updatePassword
        (this.emailAddress, this.oldPassword, this.newPassword, this.newPassword_confirmation, this.userId).subscribe(
          result => {
            this._messages.sendSuccessMessage('Password Updated', 'Please log in again');
            this.saved = true;
            this.completed.emit(true);
          },
          error => this._messages.sendErrorMessage('Could not save', error.message)
        );
    } else {
      this._service.confirmPasswordUpdate
        (this.emailAddress, this.newPassword, this.newPassword_confirmation, this.key).subscribe(
          result => {
            this._messages.sendSuccessMessage('Password Updated', 'Please log in again');
            this.saved = true;
            this.completed.emit(true);
          },
          error => this._messages.sendErrorMessage('Could not save', error.message)
        );
    }
  }

}
