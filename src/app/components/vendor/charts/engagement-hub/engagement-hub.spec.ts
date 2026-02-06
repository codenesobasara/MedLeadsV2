import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementHub } from './engagement-hub';

describe('EngagementHub', () => {
  let component: EngagementHub;
  let fixture: ComponentFixture<EngagementHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
