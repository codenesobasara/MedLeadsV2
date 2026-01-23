import type { ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexXAxis } from 'ng-apexcharts';

export interface Charts {
}

export interface EngagementChartOptions {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  series: ApexAxisChartSeries;
}