import { TestBed } from '@angular/core/testing';

import { VendorCharts } from './vendor-charts';

describe('VendorCharts', () => {
  let service: VendorCharts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorCharts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
