import { Component,inject,Output,EventEmitter, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VendorFormControl } from '../../../../../services/vendor/vendor-form-control';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-final-step',
  standalone: true,
  imports: [MatIconModule,MatAutocompleteModule,CommonModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatRadioModule,MatSelectModule,MatChipsModule,MatCheckboxModule,MatButtonModule],
  templateUrl: './final-step.html',
  styleUrl: './final-step.css',
})
export class FinalStep {
@Output() back = new EventEmitter<void>();
vendorForm = inject(VendorFormControl);
form = this.vendorForm.addRepForm
clearSelection(){}
submit(){}

onBack(){
    this.form.markAllAsTouched();
    this.back.emit()
}
provinces = [
  'Ontario',
  'Quebec',
  'British Columbia',
  'Alberta',
  'Manitoba',
  'Saskatchewan',
  'Nova Scotia',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Prince Edward Island',
  'Northwest Territories',
  'Yukon',
  'Nunavut'
];

selectCity(city:{name:string; placeId:string}){
  const currentSelection = this.vendorForm.citySelection()?? []
  this.form.controls.citySelections.setValue([...currentSelection,city])
   this.form.controls.cityQuery.setValue('')
}

removeCity(placeId: string) {
  const control = this.form.controls.citySelections;
  control.setValue(control.value.filter(c => c.placeId !== placeId));
}



}