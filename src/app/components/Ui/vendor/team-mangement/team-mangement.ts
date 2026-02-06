import { Component,inject,computed,signal,effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeneralFunctions } from '../../../../services/functions/general-functions';
import { VendorDataService } from '../../../../services/vendor/vendor-data-service';
import { DBEvent } from '../../../../interfaces/models';
import { VendorCharts } from '../../../../services/vendor/vendor-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexOptions } from 'ng-apexcharts';
import { EngagementHub } from '../../../vendor/charts/engagement-hub/engagement-hub';


@Component({
  selector: 'app-team-mangement',
imports: [CommonModule,MatIconModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatTooltipModule,NgApexchartsModule,EngagementHub],
  templateUrl: './team-mangement.html',
  styleUrl: './team-mangement.css',
  standalone:true
})
export class TeamMangement {
  constructor(){
effect(() => {
  const days = this.dates();
  if (!this.chartData.selectedShiftDate() && days.length) {
    this.chartData.selectedShiftDate.set(days[0]); 
  }
});



  }
   func =inject(GeneralFunctions)
   vendorData =inject(VendorDataService)
   chartData = inject(VendorCharts)

     selectedShiftDate = signal<string| null>(null)
     selectedEvent = computed<DBEvent|null>(()=>{
     const eventId = this.vendorData.selectedEventId()
     const topRep = this.vendorData.vendorAnalytics()?.reps[0]
     return this.vendorData.vendorEvents().find(e => e.id === eventId)?? null
    })

    dates = computed(()=>{
    const event = this.selectedEvent()
    if(!event?.startDate || !event?.endDate)return [];
    return this.func.getDateRange(event.startDate,event.endDate)
  });



}
