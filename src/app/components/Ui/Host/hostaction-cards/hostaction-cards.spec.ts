import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostactionCards } from './hostaction-cards';

describe('HostactionCards', () => {
  let component: HostactionCards;
  let fixture: ComponentFixture<HostactionCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostactionCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostactionCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
