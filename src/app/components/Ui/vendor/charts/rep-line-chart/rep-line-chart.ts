import { Component, inject } from '@angular/core';
import { NgApexchartsModule, } from 'ng-apexcharts';
import { VendorCharts } from '../../../../../services/vendor/vendor-charts';

@Component({
  selector: 'rep-line-chart',
  imports: [NgApexchartsModule],
  templateUrl: './rep-line-chart.html',
  styleUrl: './rep-line-chart.css',
})
export class RepLineChart {
  charts = inject(VendorCharts)
  series = this.charts.repLinChart
  options = this.charts.repLineChartOptions

}
