import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { VendorDataService } from '../../../../services/vendor/vendor-data-service';
import { RepLineChart } from '../charts/rep-line-chart/rep-line-chart';
import { VendorCharts } from '../../../../services/vendor/vendor-charts';

@Component({
  selector: 'app-rep-insights',
  imports: [CommonModule,MatIconModule,RepLineChart],
  templateUrl: './rep-insights.html',
  styleUrl: './rep-insights.css',
})
export class RepInsights {
  vendorData = inject(VendorDataService)
  chartData = inject(VendorCharts)
  onDaySelect(date: string) {
    console.log(date);    
  this.vendorData.selectedDay.set(date);
  this.vendorData.currentCursor.set(null); 
}
onTotalSelect(){
  this.vendorData.selectedDay.set("total")
  this.vendorData.selectedDay.set(null)
}

}
