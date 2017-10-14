import { TestBed, inject } from '@angular/core/testing';

import { OppService } from './opp.service';

describe('OppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OppService]
    });
  });

  it('should ...', inject([OppService], (service: OppService) => {
    expect(service).toBeTruthy();
  }));
});
