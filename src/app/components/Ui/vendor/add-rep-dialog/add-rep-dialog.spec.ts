import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepDialog } from './add-rep-dialog';

describe('AddRepDialog', () => {
  let component: AddRepDialog;
  let fixture: ComponentFixture<AddRepDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRepDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRepDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
