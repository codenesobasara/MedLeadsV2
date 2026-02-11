import { Component,inject,effect } from '@angular/core';
import { VendorDataService } from '../../../services/vendor/vendor-data-service';
import { State } from '../../../services/state';
import { VendorActionCard } from '../../Ui/vendor/vendor-action-card/vendor-action-card';
import { VendorKpiCards } from '../../Ui/vendor/vendor-kpi-cards/vendor-kpi-cards';
import { TeamMangement } from '../../Ui/vendor/team-mangement/team-mangement';
@Component({
  selector: 'app-vendor',
  imports: [VendorActionCard, VendorKpiCards,TeamMangement],
  templateUrl: './vendor.html',
  styleUrl: './vendor.css',
  standalone:true
})
export class Vendor {
public vendorData = inject(VendorDataService)  
public state = inject(State)

constructor(){
  effect(()=>{
   const events = this.vendorData. eventsResource.value()?? []
   if( events.length > 0 && !this.state.vendorDashState().hasevents){this.state.changVendorDashState({hasevents:true})}
    
  })
}

}
