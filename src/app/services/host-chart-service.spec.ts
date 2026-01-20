import { TestBed } from '@angular/core/testing';

import { HostChartService } from './host-chart-service';

describe('HostChartService', () => {
  let service: HostChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
