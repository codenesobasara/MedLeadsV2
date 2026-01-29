import { TestBed } from '@angular/core/testing';
import { VendorFormControl } from './vendor-form-control';

describe('VendorFormControl', () => {
  let service: VendorFormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorFormControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
