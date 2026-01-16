import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostSideBar } from './host-side-bar';

describe('HostSideBar', () => {
  let component: HostSideBar;
  let fixture: ComponentFixture<HostSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostSideBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostSideBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
