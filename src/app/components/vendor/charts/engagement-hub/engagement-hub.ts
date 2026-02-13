import { Component,inject } from '@angular/core';
import { NgApexchartsModule, } from 'ng-apexcharts';
import { VendorCharts } from '../../../../services/vendor/vendor-charts';

@Component({
  selector: 'app-engagement-hub',
imports: [NgApexchartsModule],
  templateUrl: './engagement-hub.html',
  styleUrl: './engagement-hub.css',
})
export class EngagementHub {
vendorCharts = inject(VendorCharts)
series =this.vendorCharts.series
options = this.vendorCharts.analyticsHubchartOptions
}
