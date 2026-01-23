import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Engagement } from './engagement';

describe('Engagement', () => {
  let component: Engagement;
  let fixture: ComponentFixture<Engagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Engagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Engagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
