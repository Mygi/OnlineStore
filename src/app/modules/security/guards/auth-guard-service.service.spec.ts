import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuardServiceService } from './auth-guard-service.service';
import { AuthenticationProvider } from '../../../global/contracts/services/authentication.provider';
// Config
import { APP_CONFIG, FKConfig } from '../../../app.config';

// JWT
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

describe('AuthGuardServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            }
          }
        })
      ],
      providers: [AuthGuardServiceService, {provide: APP_CONFIG, useValue: FKConfig },
        AuthenticationProvider, JwtHelperService ]
    });
  });

  it('should be created', inject([AuthGuardServiceService], (service: AuthGuardServiceService) => {
    expect(service).toBeTruthy();
  }));
});
