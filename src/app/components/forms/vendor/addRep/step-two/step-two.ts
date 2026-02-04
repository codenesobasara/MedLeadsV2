import { Component,Output,EventEmitter,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VendorFormControl } from '../../../../../services/vendor/vendor-form-control';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-step-two',
   imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule, MatAutocompleteModule,MatSelectModule
  ],
  templateUrl:'./step-two.html',
  styleUrl: './step-two.css',
})
export class StepTwo {

   vendorForm = inject(VendorFormControl)
    @Output() next = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
    form = this.vendorForm.territory;
    basicInfo = this.vendorForm.repBasicInfo;

  toggleProvince(p: string) {
  const current = this.form.controls.provinceStateSelections.value ?? [];
  const next = current.includes(p)
  ? current.filter(x => x !== p)
  : [...current, p];

  this.form.controls.provinceStateSelections.setValue(next);
}

  toggleStates(s: string) {
  const current = this.form.controls.provinceStateSelections.value ?? [];
  const next = current.includes(s)
    ? current.filter(x => x !== s)
    : [...current, s];

  this.form.controls.provinceStateSelections.setValue(next);
}

selectArea(area:{name:string,placeId:string}){
  const areaSelection = this.vendorForm.areaSelection()?? []
  this.form.controls.areaSelection.setValue([...areaSelection,area])
  this.form.controls.regionQuery.setValue("")
}

selectCity(city:{name:string; placeId:string}){
  const currentSelection = this.vendorForm.citySelection()?? []
  this.form.controls.citySelections.setValue([...currentSelection,city])
   this.form.controls.cityQuery.setValue('')
}
addPostal(code: string) {
  const current = this.form.controls.postalCodes.value ?? [];
  if (current.includes(code)) return;
  this.form.controls.postalCodes.setValue([...current, code]);
  this.form.controls.postalQuery.setValue("");
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

states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];


selectTerritoryLevel(level:any){
this.form.reset()
this.form.controls.territoryLevel.setValue(level)
}

removeProvinceState(value: string) {
  const arr = this.form.controls.provinceStateSelections.value ?? [];
  this.form.controls.provinceStateSelections.setValue(arr.filter(x => x !== value));
}

removeLastProvinceState() {
  const arr = this.form.controls.provinceStateSelections.value ?? [];
  if (!arr.length) return;
  this.form.controls.provinceStateSelections.setValue(arr.slice(0, -1));
}

removeCity(placeId: string) {
  const arr = this.form.controls.citySelections.value ?? [];
  this.form.controls.citySelections.setValue(arr.filter(c => c.placeId !== placeId));
}

removeLastCity() {
  const arr = this.form.controls.citySelections.value ?? [];
  if (!arr.length) return;
  this.form.controls.citySelections.setValue(arr.slice(0, -1));
}

removeArea(placeId: string) {
  const arr = this.form.controls.areaSelection.value ?? [];
  this.form.controls.areaSelection.setValue(arr.filter(a => a.placeId !== placeId));
}

removeLastArea() {
  const arr = this.form.controls.areaSelection.value ?? [];
  if (!arr.length) return;
  this.form.controls.areaSelection.setValue(arr.slice(0, -1));
}

removePostal(zip: string) {
  const arr = this.form.controls.postalCodes.value ?? [];
  this.form.controls.postalCodes.setValue(arr.filter(z => z !== zip));
}

removeLastPostal() {
  const arr = this.form.controls.postalCodes.value ?? [];
  if (!arr.length) return;
  this.form.controls.postalCodes.setValue(arr.slice(0, -1));
}

 onNext() {
 
    
    this.next.emit();
  }
}
