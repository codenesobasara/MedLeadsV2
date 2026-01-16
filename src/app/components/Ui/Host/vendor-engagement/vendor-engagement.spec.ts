import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEngagement } from './vendor-engagement';

describe('VendorEngagement', () => {
  let component: VendorEngagement;
  let fixture: ComponentFixture<VendorEngagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorEngagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorEngagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
