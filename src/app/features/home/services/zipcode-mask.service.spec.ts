import { TestBed } from '@angular/core/testing';

import { ZipcodeMaskService } from './zipcode-mask.service';

describe('ZipcodeMaskService', () => {
  let service: ZipcodeMaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipcodeMaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
