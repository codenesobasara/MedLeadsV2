import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepLineChart } from './rep-line-chart';

describe('RepLineChart', () => {
  let component: RepLineChart;
  let fixture: ComponentFixture<RepLineChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepLineChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepLineChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
