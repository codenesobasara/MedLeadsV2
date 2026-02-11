import { Component,inject,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VendorFormControl } from '../../../../../services/vendor/vendor-form-control';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RepShift } from '../../../../../interfaces/vendor-analytics';
import { State } from '../../../../../services/state';


@Component({
  selector: 'app-step-one',
  imports:[MatSelectModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,CommonModule, MatButtonModule,MatIconModule, MatDatepickerModule,MatNativeDateModule],
  templateUrl:'./step-one.html',
  styleUrl: './step-one.css',
    providers: [provideNativeDateAdapter()],
})
export class StepOne {

   vendorForm = inject(VendorFormControl)
   state = inject(State)
    @Output() next = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
     form = this.vendorForm.repBasicInfo;

     onNext() {
      const {firstName,lastName,email,phone} = this.form.controls
        firstName.markAsTouched();
        lastName.markAsTouched();
        email.markAsTouched();
        phone.markAsTouched();
        if (firstName.invalid || lastName.invalid || email.invalid || phone.invalid) {
        return;
  }
    
    this.next.emit();
  }

  getInitials(): string {
  const first = (this.form.controls.firstName.value || '').trim();
  const last  = (this.form.controls.lastName.value || '').trim();
  const a = first ? first[0].toUpperCase() : '';
  const b = last ? last[0].toUpperCase() : '';
  return (a + b) || 'N';
}
activeStaff(isActive:boolean){
  this.vendorForm.repBasicInfo.controls.activeStaff.setValue(isActive)
}

  timeOptions: string[] = [  '08:00 AM',
  '08:30 AM',
  '09:00 AM',
  '09:30 AM',];

  isActive(value:boolean){
    this.form.controls.activeStaff.setValue(value)
  }

  
addShift(date: Date | null, start: string | null, end: string | null) {
  if (!date || !start || !end) return;

  const current = this.form.controls.shifts.value ?? [];

  const shift: RepShift = {
    id: 0,           
    salesRepId: 0,
    vendorId: this.state.user().id,
    eventId: this.state.vendorDashState().EventId ?? 0,
    date: date.toISOString().slice(0, 10), 
    startTime: start,                      
    endTime: end                          
  };

  this.form.controls.shifts.setValue([
    ...current,
    shift
  ]);
}

}