import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorKpiCards } from './vendor-kpi-cards';

describe('VendorKpiCards', () => {
  let component: VendorKpiCards;
  let fixture: ComponentFixture<VendorKpiCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorKpiCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorKpiCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
