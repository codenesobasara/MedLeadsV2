import { TestBed } from '@angular/core/testing';

import { GeoApi } from './geo-api';

describe('GeoApi', () => {
  let service: GeoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
