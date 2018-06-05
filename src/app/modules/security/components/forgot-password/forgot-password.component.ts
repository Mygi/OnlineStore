import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../../../core/fk-forms/services/message.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: []
})
export class ForgotPasswordComponent implements OnInit {

  emailAddress: string;
  @Output() completed = new EventEmitter<boolean>(false);
  constructor(private _service: UserService, private _messages: MessageService) { }

  ngOnInit() {
  }
  send(event) {
    this._service.sendVerificationEmail(this.emailAddress).subscribe(
      data => {
        this._messages.sendSuccessMessage('Email sent', 'You will receive an email with directions on resetting your password.');
        this.completed.emit(true);
      },
      error => this._messages.sendErrorMessage('Verification Failed', error['message'])
    );
  }
}
