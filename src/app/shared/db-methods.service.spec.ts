import { TestBed } from '@angular/core/testing';

import { DbMethodsService } from './db-methods.service';

describe('DbMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbMethodsService = TestBed.get(DbMethodsService);
    expect(service).toBeTruthy();
  });
});
