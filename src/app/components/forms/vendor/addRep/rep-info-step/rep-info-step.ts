import { Component, computed,inject,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VendorFormControl } from '../../../../../services/vendor/vendor-form-control';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-rep-info-step',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,CommonModule],
  templateUrl: './rep-info-step.html',
  styleUrl: './rep-info-step.css',
})
export class RepInfoStep {
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
}


