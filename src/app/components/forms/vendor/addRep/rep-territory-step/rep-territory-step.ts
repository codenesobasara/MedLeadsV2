import { Component,inject,Output,EventEmitter, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VendorFormControl } from '../../../../../services/vendor/vendor-form-control';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-rep-territory-step',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatRadioModule,MatSelectModule],
  templateUrl: './rep-territory-step.html',
  styleUrl: './rep-territory-step.css',
})
export class RepTerritoryStep {
  @Output() next = new EventEmitter<void>();
@Output() back = new EventEmitter<void>();

  vendorForm = inject(VendorFormControl);
  form = this.vendorForm.addRepForm;

     onNext() {
     if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.next.emit();
  }

onBack(){
    this.form.markAllAsTouched();
  this.back.emit()
}

}
