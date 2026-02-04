import { Component, signal,computed,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { VendorFormControl } from '../../../../services/vendor/vendor-form-control';
import { StepOne } from '../../../forms/vendor/addRep/step-one/step-one';
import { StepTwo } from '../../../forms/vendor/addRep/step-two/step-two';
import { StepThree } from '../../../forms/vendor/addRep/step-three/step-three';

@Component({
  selector: 'app-add-rep-dialog',
  standalone:true,
  imports: [MatProgressBarModule,StepOne,StepTwo,CommonModule,StepThree],
  templateUrl: './add-rep-dialog.html',
  styleUrl: './add-rep-dialog.css',
})
export class AddRepDialog {
  vendorForm = inject(VendorFormControl,)

  totalSteps = 3;
  step = signal(0);

  stepNumber = computed(() => this.step() + 1);

    progressValue = computed(() => {
      console.log("Progress Value Fired");
    return (this.stepNumber() / this.totalSteps) * 100;
  });

   next() {
      console.log('PARENT next() CALLED. step before:', this.step());
    
    if (this.step() < this.totalSteps - 1) {
       this.step.update(v => v + 1);
         console.log('step after:', this.step());
    }
  }

    back() {
    if (this.step() > 0) {
      this.step.update(v => v - 1);
    }
  }

}
