import { TestBed, inject } from '@angular/core/testing';

import { BankingService } from './banking.service';
import { MocksModule } from '../../../mocks/mocks.module';

describe('BankingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MocksModule],
      providers: [BankingService]
    });
  });

  it('should be created', inject([BankingService], (service: BankingService) => {
    expect(service).toBeTruthy();
  }));
});
