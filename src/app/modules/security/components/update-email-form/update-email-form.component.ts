import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../../../core/fk-forms/services/message.service';

@Component({
  selector: 'app-update-email-form',
  templateUrl: './update-email-form.component.html',
  styleUrls: ['./update-email-form.component.scss']
})
export class UpdateEmailFormComponent implements OnInit {
  @Output() completed = new EventEmitter<boolean>();
  @Input() private = false;
  emailAddress: string;
  password: string;
  newEmail: string;
  newEmail_confirmation: string;
  @Input() userId = 0;
  constructor(private _service: UserService, private _messages: MessageService) { }

  ngOnInit() {
  }
  save(event) {
    this._service.updateEmail
      (this.emailAddress, this.password, this.newEmail, this.newEmail_confirmation, this.userId).subscribe(
        data => {
        this._messages.sendSuccessMessage('Email verification sent',
          'A verification email has been sent to your new email address to confirm this change..');
        this.completed.emit(true);
        },
        error => {
          this._messages.sendErrorMessage('Email Update failed', 'Please try again or contact support as soon as possible');
        });
  }
}
