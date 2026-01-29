import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepInfoStep } from './rep-info-step';

describe('RepInfoStep', () => {
  let component: RepInfoStep;
  let fixture: ComponentFixture<RepInfoStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepInfoStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepInfoStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
