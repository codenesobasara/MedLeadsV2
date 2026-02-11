import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepInsights } from './rep-insights';

describe('RepInsights', () => {
  let component: RepInsights;
  let fixture: ComponentFixture<RepInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepInsights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
