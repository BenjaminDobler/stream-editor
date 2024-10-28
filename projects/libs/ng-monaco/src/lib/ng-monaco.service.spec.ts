import { TestBed } from '@angular/core/testing';

import { NgMonacoService } from './ng-monaco.service';

describe('NgMonacoService', () => {
  let service: NgMonacoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMonacoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
