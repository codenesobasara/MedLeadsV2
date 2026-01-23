import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTopBar } from './vendor-top-bar';

describe('VendorTopBar', () => {
  let component: VendorTopBar;
  let fixture: ComponentFixture<VendorTopBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorTopBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorTopBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
