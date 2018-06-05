import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { MocksModule } from '../../../mocks/mocks.module';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
