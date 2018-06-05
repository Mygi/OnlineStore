import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Country } from '../../models/countries.model';
import { AuthUser } from '../../models/auth-user.model';
import { AuthenticationProvider } from '../../../../global/contracts/services/authentication.provider';
import { UserWithProfile } from '../../../../global/contracts/modules/user.contract';
import { UserProfile } from '../../models/user-profile.model';
import { MessageService } from '../../../../core/fk-forms/services/message.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  countries: Country[];
  states: {name: string, value: string}[] = [
    { name: 'ACT', value: 'ACT' },
    { name: 'NSW', value: 'NSW' },
    { name: 'NT', value: 'NT' },
    { name: 'QLD', value: 'QLD' },
    { name: 'SA', value: 'SA' },
    { name: 'TAS', value: 'TAS' },
    { name: 'VIC', value: 'VIC' },
    { name: 'WA', value: 'WA' }
  ];
  user: AuthUser = new AuthUser();
  display = false;
  header = 'Reset password';
  showEmailForm = false;
  constructor(private _service: UserService, private _auth: AuthenticationProvider,
    private _messageService: MessageService) { }

  ngOnInit() {
    this._messageService.clear();
    this._service.getCountries().subscribe( data =>
      this.arrangeCountryData(data.data)
    );
    this.user = this._auth.getAuthUser() as AuthUser;

    this._service.getUserDetails(this.user.getId()).subscribe(
      user => this.arrangeUser(user)
    );
  }

  arrangeUser(user: UserProfile) {
    this.user.userProfile = user;
  }
  arrangeCountryData(data: any[]) {
    this.countries = data.map(
      x => {
        const country = new Country();
        country.name = x.name.common;
        country.code = x.cca2;
        return country;
      }) ;
  }
  save(form: any): void {
    this._service.saveUserDetails(this.user.userProfile, this.user.userID).subscribe(
      response => this._messageService.sendSuccessMessage('Success', 'Your details have been updated'),
      error => this._messageService.sendErrorMessage('Error', 'Your details have not been updated'),
  );
  }
}
