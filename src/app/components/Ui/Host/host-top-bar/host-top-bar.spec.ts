import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostTopBar } from './host-top-bar';

describe('HostTopBar', () => {
  let component: HostTopBar;
  let fixture: ComponentFixture<HostTopBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostTopBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostTopBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
