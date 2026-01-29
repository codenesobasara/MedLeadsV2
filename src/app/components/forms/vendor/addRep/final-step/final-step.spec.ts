import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalStep } from './final-step';

describe('FinalStep', () => {
  let component: FinalStep;
  let fixture: ComponentFixture<FinalStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
