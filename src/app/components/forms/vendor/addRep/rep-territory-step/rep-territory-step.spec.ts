import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepTerritoryStep } from './rep-territory-step';

describe('RepTerritoryStep', () => {
  let component: RepTerritoryStep;
  let fixture: ComponentFixture<RepTerritoryStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepTerritoryStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepTerritoryStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
