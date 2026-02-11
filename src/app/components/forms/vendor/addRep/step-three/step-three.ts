import { Component,computed,inject } from '@angular/core';
import { VendorFormControl } from '../../../../../services/vendor/vendor-form-control';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { State } from '../../../../../services/state';
import { VendorDataService } from '../../../../../services/vendor/vendor-data-service';
import { DBEvent } from '../../../../../interfaces/dbReuturnModels';
import { AddRepDialog } from '../../../../Ui/vendor/add-rep-dialog/add-rep-dialog';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-step-three',
  imports: [    CommonModule,ReactiveFormsModule,MatIconModule, MatButtonModule],
  templateUrl: './step-three.html',
  styleUrl: './step-three.css',
})
export class StepThree {
   vendorForm = inject(VendorFormControl)
   vendorData = inject(VendorDataService)
     dialog = inject(MatDialog);
    form = this.vendorForm.territory;
    basicInfo = this.vendorForm.repBasicInfo;
    state = inject(State)

     selectedEvent = computed<DBEvent|null>(()=>{
     const eventId = this.vendorData.selectedEventId()
     return this.vendorData.vendorEvents().find(e => e.id === eventId)?? null
    })

    submit(){
     const repObject = this.vendorForm.createRepObject()
     console.log(repObject);
     if(repObject){this.vendorForm.repObject.set(repObject); this.dialog.closeAll()}
    }
    
}
