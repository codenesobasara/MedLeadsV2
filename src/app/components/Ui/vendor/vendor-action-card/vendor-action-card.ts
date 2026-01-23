import { Component,inject,effect } from '@angular/core';
import { State } from '../../../../services/state';
import { VendorDash } from '../../../../interfaces/userstate';
import { VendorDataService } from '../../../../services/vendor/vendor-data-service';
import { DBEvent } from '../../../../interfaces/models';
import { DatePipe } from '@angular/common';
import { AsyncPipe,UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vendor-action-card',
  imports:[AsyncPipe,DatePipe,UpperCasePipe,MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl:'./vendor-action-card.html',
  styleUrl: './vendor-action-card.css',
})
export class VendorActionCard {
state = inject(State)
vendorData = inject(VendorDataService)

constructor(){
  effect(() => {
  const user = this.state.user();
  const vendorDashState: VendorDash = this.state.vendorDashState();


});}


events = this.vendorData.vendorEvents
public vendorDashState = this.state.vendorDashState

  selectEvent(event:DBEvent){
  this.state.changVendorDashState({ eventSelected: true, EventId: event.id })
}




}
