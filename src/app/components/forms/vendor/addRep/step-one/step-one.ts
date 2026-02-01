import { Component,inject,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VendorFormControl } from '../../../../../services/vendor/vendor-form-control';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-step-one',
  imports:[MatSelectModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,CommonModule, MatButtonModule,MatIconModule],
  templateUrl: './step-one.html',
  styleUrl: './step-one.css',
})
export class StepOne {

   vendorForm = inject(VendorFormControl)
    @Output() next = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
    form = this.vendorForm.addRepForm;

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

}
