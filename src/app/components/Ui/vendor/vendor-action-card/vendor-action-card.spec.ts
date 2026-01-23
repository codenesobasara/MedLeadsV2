import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorActionCard } from './vendor-action-card';

describe('VendorActionCard', () => {
  let component: VendorActionCard;
  let fixture: ComponentFixture<VendorActionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorActionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorActionCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
