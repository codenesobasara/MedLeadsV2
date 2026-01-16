import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostKpiCards } from './host-kpi-cards';

describe('HostKpiCards', () => {
  let component: HostKpiCards;
  let fixture: ComponentFixture<HostKpiCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostKpiCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostKpiCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
