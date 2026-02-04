import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMangement } from './team-mangement';

describe('TeamMangement', () => {
  let component: TeamMangement;
  let fixture: ComponentFixture<TeamMangement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamMangement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamMangement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
