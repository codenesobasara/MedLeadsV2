import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSideBar } from './vendor-side-bar';

describe('VendorSideBar', () => {
  let component: VendorSideBar;
  let fixture: ComponentFixture<VendorSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorSideBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorSideBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
